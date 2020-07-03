import { Component, OnInit } from '@angular/core';
import { SocialProjectService } from '../social-project/social-project.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { SocialProjectDTO } from 'src/app/domain/social-project-dto';
import { City } from 'src/app/domain/city';
import { State } from 'src/app/domain/state';
import { LocationService } from 'src/app/shared/locations/locations.service';

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

	constructor(private socialProjectService: SocialProjectService,
				private locationService: LocationService,
				private router: Router) {
		this.fgSearch = new FormGroup({
			state: new FormControl(null),
			city: new FormControl(null),
			institution: new FormControl(null)
		});
	}

	ngOnInit() {
		this.searchSocialProjects();
	}
	
	searchSocialProjects() {
		this.socialProjectService.getSocialProjectByFilters().subscribe(socialProjects => {
			this.socialProjects = socialProjects;
		});
	}

	getSubTitle(socialProjectDTO: SocialProjectDTO): string {
		return socialProjectDTO.institutionName + " - " + socialProjectDTO.institutionCity;
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

}
