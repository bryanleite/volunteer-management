import { Component, OnInit } from '@angular/core';
import { SocialProjectService } from '../social-project/social-project.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { SocialProjectDTO } from 'src/app/domain/social-project-dto';
import { City } from 'src/app/domain/city';
import { State } from 'src/app/domain/state';
import { LocationService } from 'src/app/shared/locations/locations.service';
import { Institution } from 'src/app/domain/institution';
import { InstitutionService } from '../institution/institution.service';
import { StorageService } from 'src/app/shared/storage/storage.service';
import { SocialProjectVolunteerType } from 'src/app/domain/socialProjectVolunteerType';

import * as moment from 'moment';

@Component({
	selector: 'app-social-project-search',
	templateUrl: './social-project-search.component.html',
	styleUrls: ['./social-project-search.component.less']
})
export class SocialProjectSearchComponent implements OnInit {

	public fgSearch: FormGroup;
	public socialProjects: SocialProjectDTO[] = [];
	public states: State[] = [];
	public cities: City[] = [];
	public institutions: Institution[];

	constructor(private socialProjectService: SocialProjectService,
				private locationService: LocationService,
				private institutionService: InstitutionService,
				private storageService: StorageService,
				private route: ActivatedRoute,
				private router: Router) {
		this.fgSearch = new FormGroup({
			state: new FormControl(null),
			city: new FormControl(null),
			institution: new FormControl(null)
		});
	}

	ngOnInit() {
		this.getStates();
		this.getInstitutions();
		this.setStateAndCityByCurrentUser();
		this.searchSocialProjects();
	}
	
	edit(socialProjectId?: number) {
		let params = [];
		params.push('../social-projects');
		if(socialProjectId) {
			params.push({ id: socialProjectId, beforePage: 's' });
		}
		
		this.router.navigate(params, {relativeTo: this.route});
	}

	searchSocialProjects() {
		const state = this.fgSearch.get('state').value;
		const city = this.fgSearch.get('city').value;
		const institutionId = this.fgSearch.get('institution').value ? this.fgSearch.get('institution').value.id : undefined;
		this.socialProjectService.getSocialProjectByFilters(state, city, institutionId).subscribe(socialProjects => {
			this.socialProjects = socialProjects;
		});
	}

	getSubTitle(socialProjectDTO: SocialProjectDTO): string {
		return socialProjectDTO.institutionName + " - " + socialProjectDTO.institutionCity;
	}

	getInstitutions() {
		this.institutionService.getInstitutions().subscribe(institutions => {
			this.institutions = institutions;
		});
	}

	getStates() {
		this.locationService.getAllStates().subscribe(states => {
			this.states = states;
			this.states.sort((a,b) => a.nome.localeCompare(b.nome));
		});
	}

	onSelectState(uf: string) {
		this.locationService.getCitiesByUF(uf).subscribe(cities => {
			this.cities = cities;
			this.cities.sort((a,b) => a.nome.localeCompare(b.nome));
		});
	}

	setStateAndCityByCurrentUser() {
		let user = JSON.parse(this.storageService.getUser());
		if(user.volunteer && user.volunteer.state) {
			this.fgSearch.get('state').setValue(user.volunteer.state);
			this.fgSearch.get('city').setValue(user.volunteer.city);
			this.onSelectState(user.volunteer.state);
		}
	}

	getSocialProjectVolunteerTypeName(socialProjectVolunteerType: SocialProjectVolunteerType): string {
		return SocialProjectVolunteerType.getSocialProjectVolunteerTypeName(socialProjectVolunteerType);
	}

	getSocialProjectVolunteerTypeColor(socialProjectVolunteerType: SocialProjectVolunteerType): string {
		return SocialProjectVolunteerType.getSocialProjectVolunteerTypeColor(socialProjectVolunteerType);
	}
}
