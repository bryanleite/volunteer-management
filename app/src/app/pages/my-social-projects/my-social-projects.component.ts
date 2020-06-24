import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/shared/storage/storage.service';
import { SocialProjectService } from '../social-project/social-project.service';
import { Volunteer } from 'src/app/domain/volunteer';
import { SocialProjectDTO } from 'src/app/domain/social-project-dto';
import { Router, ActivatedRoute } from '@angular/router';
import { SocialProjectVolunteerType } from 'src/app/domain/socialProjectVolunteerType';

@Component({
	selector: 'app-my-social-projects',
	templateUrl: './my-social-projects.component.html',
	styleUrls: ['./my-social-projects.component.less']
})
export class MySocialProjectsComponent implements OnInit {

	public isManager: boolean;
	public socialProjects: SocialProjectDTO[] = [];
	private currentVolunteer: Volunteer;

	constructor(private storageService: StorageService,
				private socialProjectService: SocialProjectService,
				private router: Router,
				private route: ActivatedRoute) { }

	ngOnInit() {
		let user = JSON.parse(this.storageService.getUser());
		this.currentVolunteer = user.volunteer;
		this.isManager = user.institution && user.institution.id;
		if (this.currentVolunteer && this.currentVolunteer.id) {
			this.socialProjectService.getMySocialProjects(this.currentVolunteer.id).subscribe(res => {
				if (res) {
					this.socialProjects = res;
				}
			});
		}
	}

	edit(socialProjectId?: number) {
		let params = [];
		params.push('../social-projects');
		if(socialProjectId) {
			params.push({ id: socialProjectId });
		}
		
		this.router.navigate(params, {relativeTo: this.route});
	}

	getSubTitle(socialProjectDTO: SocialProjectDTO): string {
		return socialProjectDTO.institutionName + " - " + socialProjectDTO.institutionCity;
	}

	getSocialProjectVolunteerTypeName(socialProjectVolunteerType: SocialProjectVolunteerType): string {
		return SocialProjectVolunteerType.getSocialProjectVolunteerTypeName(socialProjectVolunteerType);
	}

	getSocialProjectVolunteerTypeColor(socialProjectVolunteerType: SocialProjectVolunteerType): string {
		return SocialProjectVolunteerType.getSocialProjectVolunteerTypeColor(socialProjectVolunteerType);
	}

}
