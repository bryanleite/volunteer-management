import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Institution } from 'src/app/domain/institution';
import { StorageService } from 'src/app/shared/storage/storage.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Volunteer } from 'src/app/domain/volunteer';
import { SocialProject } from 'src/app/domain/social-project';
import { TranslateService } from '@ngx-translate/core';
import { NzMessageService, NzNotificationService } from 'ng-zorro-antd';
import { SocialProjectService } from './social-project.service';
import { SocialProjectVolunteer } from 'src/app/domain/socialProjectVolunteer';
import { SocialProjectVolunteerService } from './social-project-volunteer.service';
import { SocialProjectVolunteerType } from 'src/app/domain/socialProjectVolunteerType';
import { Skill } from 'src/app/domain/skill';
import { SkillService } from '../volunteer/skill.service';
import { VolunteerService } from '../volunteer/volunteer.service';
import { UserInformationsComponent } from 'src/app/user-informations/user-informations.component';

@Component({
	selector: 'app-social-project',
	templateUrl: './social-project.component.html',
	styleUrls: ['./social-project.component.less']
})
export class SocialProjectComponent implements OnInit {

	public socialProjectVolunteerType: SocialProjectVolunteerType; // MANAGER / VOLUNTEER / CANDIDATE / INVITED / NO_VOLUNTEER
	
	public institution: Institution;
	private currentVolunteer: Volunteer;
	private volunteers: Volunteer[];
	public fgSp: FormGroup;
	public fgVs: FormGroup;
	public isModalVisible: boolean = false;
	public skills: Skill[] = [];
	public volunteersToInvite: Volunteer[];
	@ViewChild(UserInformationsComponent)
	private userInformations: UserInformationsComponent;

	constructor(private activatedRouter: ActivatedRoute,
				private storageService: StorageService,
				private translateService: TranslateService,
				private messageService: NzMessageService,
				private socialProjectService: SocialProjectService,
				private socialProjectVolunteerService: SocialProjectVolunteerService,
				private skillService: SkillService,
				private volunteerService: VolunteerService,
				private notification: NzNotificationService,
				private router: Router) { 

		this.fgSp = new FormGroup({
			id: new FormControl(null),
			name: new FormControl(null, [Validators.required]),
			description: new FormControl(null, [Validators.required]),
			initialDate: new FormControl(null, [Validators.required]),
			finalDate: new FormControl(null)
		});
		this.fgVs = new FormGroup({
			formalName: new FormControl(null),
			skill: new FormControl(null)
		})
	}

	ngOnInit() {
		let user = JSON.parse(this.storageService.getUser());
		this.currentVolunteer = user.volunteer;
		this.activatedRouter.params.subscribe(p => {
			if (p.id) {
				this.buildSocialProjectById(p.id);
			} else {
				this.socialProjectVolunteerType = SocialProjectVolunteerType.MANAGER;
				this.institution = user.institution;
				if(!this.institution || !this.institution.id) {
					this.emitSucessMessage('SECURITY.ROLES.FORBIDDEN.DESCRIPTION');
					this.router.navigate(['/my']);
				}
			}
		});

		this.skillService.findAll(true).subscribe((skills: Skill[]) => {
			this.skills = skills;
		});
	}

	private buildSocialProjectById(id: number) {
		this.socialProjectService.edit(id).subscribe(socialProject => {
			if(socialProject) {
				this.institution = socialProject.institution;
				this.buildForm(socialProject);
	
				this.socialProjectVolunteerService.getSocialProjectVolunteers(id).subscribe((volunteers: Volunteer[]) => {
					this.volunteers = volunteers;
					this.identifySocialProjectVolunteerTypeByCurrentVolunteer();
				});
			} else {
				this.emitSucessMessage('SECURITY.ROLES.FORBIDDEN.DESCRIPTION');
				this.router.navigate(['/my']);
			}
		});
	}

	private identifySocialProjectVolunteerTypeByCurrentVolunteer() {
		let volunteer = this.volunteers.find(v => v.id == this.currentVolunteer.id);
		this.socialProjectVolunteerType = volunteer ? volunteer.socialProjectVolunteerType : SocialProjectVolunteerType.NO_VOLUNTEER;
	}

	private buildForm(socialProject: SocialProject) {
        Object.keys(this.fgSp.controls).forEach(control => {
            if(socialProject[control]) {
                this.fgSp.get(control).setValue(socialProject[control]);
            }
        });
    }

	saveSp() {
		if(this.isValidSocialProject() && this.institution) {
			const socialProject = this.getSocialProjectFromForm();
			const isEdit = socialProject && socialProject.id;
			this.socialProjectService.save(this.getSocialProjectFromForm()).subscribe(socialProject => {
				if(socialProject) {
					if(!isEdit && this.currentVolunteer) {
						const socialProjectVolunteer: SocialProjectVolunteer = new SocialProjectVolunteer();
						socialProjectVolunteer.socialProjectVolunteerType = SocialProjectVolunteerType.MANAGER;
						socialProjectVolunteer.socialProject = new SocialProject();
						socialProjectVolunteer.socialProject.id = socialProject.id;
						socialProjectVolunteer.volunteer = new Volunteer();
						socialProjectVolunteer.volunteer.id = this.currentVolunteer.id;
	
						this.socialProjectVolunteerService.save(socialProjectVolunteer).subscribe(res => {
							this.emitSucessMessage('ALERTS.SAVE_SUCCESS');
							this.router.navigate(['/', { id: socialProject.id }]);
						});
					} else {
						this.emitSucessMessage('ALERTS.SAVE_SUCCESS');
					}
					this.buildSocialProjectById(socialProject.id);
				}
			});
		}
	}

	getSocialProjectFromForm(): SocialProject {
		let socialProject: SocialProject = new SocialProject();
		if (this.fgSp && this.institution) {
			socialProject.id = this.fgSp.get('id') ? this.fgSp.get('id').value : undefined;
			socialProject.name = this.fgSp.get('name') ? this.fgSp.get('name').value : undefined;
			socialProject.description = this.fgSp.get('description') ? this.fgSp.get('description').value : undefined;
			socialProject.initialDate = this.fgSp.get('initialDate') ? this.fgSp.get('initialDate').value : undefined;
			socialProject.finalDate = this.fgSp.get('finalDate') ? this.fgSp.get('finalDate').value : undefined;
			socialProject.institution = new Institution();
			socialProject.institution.id = this.institution.id;
		}
		return socialProject;
	}

	isValidSocialProject(): boolean {
		if (!this.fgSp.valid) {
			this.emitSucessMessage('ALERTS.FIELDS_REQUIRED');
		}
		return true;
	}
	
	removeVolunteer(volunteer: Volunteer) {
		if(volunteer && volunteer.socialProjectVolunteerId) {
			this.socialProjectVolunteerService.delete(volunteer.socialProjectVolunteerId).subscribe( res => {
				this.emitSucessMessage('ALERTS.SAVE_SUCCESS');
				let index = this.volunteers.findIndex(v => { return v.id == volunteer.id });
				if(index && index !== -1) {
					this.volunteers.splice(index, 1);
				}
			});
		}
	}

	declineInvitation() {
		if(this.currentVolunteer && this.currentVolunteer.id) {
			const volunteer: Volunteer = this.volunteers.find(v => v.id == this.currentVolunteer.id);
			if(volunteer) {
				this.removeVolunteer(volunteer);
			}
		}
	}

	acceptInvite() {
		if(this.currentVolunteer && this.currentVolunteer.id) {
			const volunteer: Volunteer = this.volunteers.find(v => v.id == this.currentVolunteer.id);
			if(volunteer) {
				this.updateSocialProjectVolunteer(volunteer, SocialProjectVolunteerType.VOLUNTEER, 'PAGES.SOCIAL_PROJECT.ACCEPT_INVITE_SUCCESS');
				this.socialProjectVolunteerType = SocialProjectVolunteerType.VOLUNTEER;
			}
		}
	}

	makeManager(volunteer: Volunteer) {
		this.updateSocialProjectVolunteer(volunteer, SocialProjectVolunteerType.MANAGER);
	}

	approveCandidate(volunteer: Volunteer) {
		this.updateSocialProjectVolunteer(volunteer, SocialProjectVolunteerType.VOLUNTEER);
	}

	updateSocialProjectVolunteer(volunteer: Volunteer, socialProjectVolunteerType: SocialProjectVolunteerType, notification?: string) {
		if(volunteer) {
			const socialProjectVolunteer = this.buildSocialProjectVolunteer(volunteer, socialProjectVolunteerType);
			
			this.socialProjectVolunteerService.save(socialProjectVolunteer).subscribe(res => {
				this.emitSuccessNotification(notification ? notification : 'ALERTS.SAVE_SUCESS');
				volunteer.socialProjectVolunteerType = socialProjectVolunteerType;
			});
		}
	}

	buildSocialProjectVolunteer(volunteer: Volunteer, socialProjectVolunteerType: SocialProjectVolunteerType): SocialProjectVolunteer {
		const socialProjectVolunteer: SocialProjectVolunteer = new SocialProjectVolunteer();
		socialProjectVolunteer.socialProjectVolunteerType = socialProjectVolunteerType;
		socialProjectVolunteer.socialProject = new SocialProject();
		socialProjectVolunteer.socialProject.id = this.fgSp.get('id') ? this.fgSp.get('id').value : undefined;
		socialProjectVolunteer.volunteer = new Volunteer();
		socialProjectVolunteer.volunteer.id = volunteer.id;
		socialProjectVolunteer.id = volunteer.socialProjectVolunteerId;

		return socialProjectVolunteer;
	}

	inviteVolunteer(volunteer: Volunteer) {
		const socialProjectId = this.fgSp.get('id') ? this.fgSp.get('id').value : undefined;
		if(volunteer && socialProjectId) {
			const socialProjectVolunteer = this.buildSocialProjectVolunteer(volunteer, SocialProjectVolunteerType.INVITED);
			this.socialProjectVolunteerService.save(socialProjectVolunteer).subscribe(res => {
				this.socialProjectVolunteerService.getSocialProjectVolunteers(socialProjectId).subscribe((volunteers: Volunteer[]) => {
					this.volunteers = volunteers;
					this.searchVolunteersToInvite();
					this.emitSucessMessage('PAGES.SOCIAL_PROJECT.INVITED_SUCCESS');
				});
			});
		}
	}

	applyForSocialProject() {
		if(this.currentVolunteer && this.currentVolunteer.id) {
			this.updateSocialProjectVolunteer(this.currentVolunteer, SocialProjectVolunteerType.CANDIDATE, 'PAGES.SOCIAL_PROJECT.CANDIDATE_SUCCESS');
			this.socialProjectVolunteerType = SocialProjectVolunteerType.CANDIDATE;
		}
	}

	searchVolunteersToInvite() {
		const socialProjectId = this.fgSp.get('id') ? this.fgSp.get('id').value : undefined;
		if(socialProjectId) {
			let skill: Skill;
			let skillAux = this.fgVs.get('skill') ? this.fgVs.get('skill').value : undefined;
			if (skillAux) {
				if (typeof (skillAux) !== 'string') {
					skill = skillAux;
				}
			}
			let formalName = this.fgVs.get('formalName') ? this.fgVs.get('formalName').value : undefined;
			
			this.volunteerService.getVolunteersWithFilters(socialProjectId, formalName, skill ? skill.id : undefined).subscribe(volunteers => {
				this.volunteersToInvite = volunteers;
			});
		}
	}

	private emitSucessMessage(msg: string) {
		this.translateService.get(msg).subscribe(msg => {
			this.messageService.success(msg);
		});
	}

	private emitSuccessNotification(msg: string) {
		this.translateService.get(msg).subscribe(message => {
			this.notification.create('success', 'Sucesso', message);
		});
	}

	openUserInformations(userId: number) {
		this.userInformations.loadUserAndOpen(userId, false);
	}

	isManager(): boolean {
		return this.socialProjectVolunteerType == SocialProjectVolunteerType.MANAGER;
	}

	isInvited(): boolean {
		return this.socialProjectVolunteerType == SocialProjectVolunteerType.INVITED;
	}

	isNoVolunteer(): boolean {
		return this.socialProjectVolunteerType == SocialProjectVolunteerType.NO_VOLUNTEER;
	}

	isCandidate(): boolean {
		return this.socialProjectVolunteerType == SocialProjectVolunteerType.CANDIDATE;
	}

	getActiveVolunteers(): Volunteer[] {
		return this.volunteers ? this.volunteers.filter(v => this.isActiveVolunteer(v.socialProjectVolunteerType)) : new Volunteer[0];
	}

	getPossibleVolunteers(): Volunteer[] {
		return this.volunteers ? this.volunteers.filter(v => !this.isActiveVolunteer(v.socialProjectVolunteerType)) : new Volunteer[0];
	}

	isActiveVolunteer(socialProjectVolunteerType: SocialProjectVolunteerType): boolean {
		return socialProjectVolunteerType && (socialProjectVolunteerType == SocialProjectVolunteerType.MANAGER || socialProjectVolunteerType == SocialProjectVolunteerType.VOLUNTEER);
	}

	getSocialProjectVolunteerTypeName(socialProjectVolunteerType: SocialProjectVolunteerType): string {
		return SocialProjectVolunteerType.getSocialProjectVolunteerTypeName(socialProjectVolunteerType);
	}

	getSocialProjectVolunteerTypeColor(socialProjectVolunteerType: SocialProjectVolunteerType): string {
		return SocialProjectVolunteerType.getSocialProjectVolunteerTypeColor(socialProjectVolunteerType);
	}

	showModal() {
		this.isModalVisible = true;
	}

	hideModal() {
		this.isModalVisible = false;
	}

}
