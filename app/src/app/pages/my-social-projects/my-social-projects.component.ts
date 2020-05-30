import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/shared/storage/storage.service';
import { SocialProjectService } from '../social-project/social-project.service';
import { Volunteer } from 'src/app/domain/volunteer';
import { SocialProjectDTO } from 'src/app/domain/social-project-dto';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-my-social-projects',
	templateUrl: './my-social-projects.component.html',
	styleUrls: ['./my-social-projects.component.less']
})
export class MySocialProjectsComponent implements OnInit {

	public socialProjects: SocialProjectDTO[] = [];
	private currentVolunteer: Volunteer;

	constructor(private storageService: StorageService,
				private socialProjectService: SocialProjectService,
				private router: Router,
				private route: ActivatedRoute) { }

	ngOnInit() {
		let user = JSON.parse(this.storageService.getUser());
		this.currentVolunteer = user.volunteer;
		if (this.currentVolunteer && this.currentVolunteer.id) {
			this.socialProjectService.getMySocialProjects(this.currentVolunteer.id).subscribe(res => {
				if (res) {
					this.socialProjects = res;
				}
			});
		}
	}

	edit(socialProjectId: number) {
		this.router.navigate(['../social-projects', { id: socialProjectId }], {relativeTo: this.route});
	}

	getSubTitle(socialProjectDTO: SocialProjectDTO): string {
		return socialProjectDTO.institutionName + " - " + socialProjectDTO.institutionCity;
	}

}
