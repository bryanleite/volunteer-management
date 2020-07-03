import { Component, OnInit, Input } from '@angular/core';
import { UserInformationsDTO } from '../domain/user-informations-dto';
import { UserInformationsService } from './user-informations.service';
import { SocialProjectDTO } from '../domain/social-project-dto';
import { SocialProjectVolunteerType } from '../domain/socialProjectVolunteerType';
import { Router } from '@angular/router';

@Component({
	selector: 'user-informations',
	templateUrl: './user-informations.component.html',
	styleUrls: ['./user-informations.component.less']
})
export class UserInformationsComponent implements OnInit {

	public isVisible: boolean;
	public isEditable: boolean;
	public userInformations: UserInformationsDTO;

	constructor(private userInformationsService: UserInformationsService,
				private router: Router) { }

	ngOnInit() {
	}

	public setVisible(isVisible: boolean) {
		this.isVisible = isVisible;
	}

	public loadUserAndOpen(userId: number, isEditable: boolean) {
		if(userId) {
			this.isEditable = isEditable;
			this.userInformations = undefined;
			this.userInformationsService.getUserInformations(userId).subscribe(user => {
				this.userInformations = user;
				this.isVisible = true;
			});
		}
	}

	close() {
		this.userInformations = undefined;
		this.isVisible = false;
		this.isEditable = false;
	}

	openSocialProject(socialProjectId: number) {
		this.router.navigate(["pages/social-projects", { id: socialProjectId }]);
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
