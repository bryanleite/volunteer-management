import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Institution } from 'src/app/domain/institution';
import { StorageService } from 'src/app/shared/storage/storage.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Volunteer } from 'src/app/domain/volunteer';
import { SocialProject } from 'src/app/domain/social-project';
import { TranslateService } from '@ngx-translate/core';
import { NzMessageService } from 'ng-zorro-antd';
import { SocialProjectService } from './social-project.service';
import { SocialProjectVolunteer } from 'src/app/domain/socialProjectVolunteer';
import { SocialProjectVolunteerService } from './social-project-volunteer.service';
import { SocialProjectVolunteerType } from 'src/app/domain/socialProjectVolunteerType';

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

	constructor(private _activatedRouter: ActivatedRoute,
				private storageService: StorageService,
				private _translateService: TranslateService,
				private _messageService: NzMessageService,
				private socialProjectService: SocialProjectService,
				private socialProjectVolunteerService: SocialProjectVolunteerService,
				private _router: Router) { 

		this.fgSp = new FormGroup({
			id: new FormControl(null),
			name: new FormControl(null, [Validators.required]),
			description: new FormControl(null, [Validators.required])
		});
	}

	ngOnInit() {
		let user = JSON.parse(this.storageService.getUser());
		this.currentVolunteer = user.volunteer;
		this._activatedRouter.params.subscribe(p => {
			if (p.id) {
				this.buildSocialProjectById(p.id);
			} else {
				this.socialProjectVolunteerType = SocialProjectVolunteerType.MANAGER;
				this.institution = user.institution;
				if(!this.institution || !this.institution.id) {
					this._translateService.get('SECURITY.ROLES.FORBIDDEN.DESCRIPTION').subscribe(msg => {
						this._messageService.success(msg);
					});
					this._router.navigate(['/my-social-projects']);
				}
			}
		});
	}

	private buildSocialProjectById(id: number) {
		this.socialProjectService.edit(id).subscribe(socialProject => {
			this.institution = socialProject.institution;
			this.buildForm(socialProject);

			this.socialProjectVolunteerService.getSocialProjectVolunteers(id).subscribe((volunteers: Volunteer[]) => {
				this.volunteers = volunteers;
				this.identifySocialProjectVolunteerTypeByCurrentVolunteer();
			});
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
							this._translateService.get('ALERTS.SAVE_SUCCESS').subscribe(msg => {
								this._messageService.success(msg);
							});
						});
					} else {
						this._translateService.get('ALERTS.SAVE_SUCCESS').subscribe(msg => {
							this._messageService.success(msg);
						});
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
			socialProject.institution = new Institution();
			socialProject.institution.id = this.institution.id;
		}
		return socialProject;
	}

	isValidSocialProject(): boolean {
		if (!this.fgSp.valid) {
			this._translateService.get('ALERTS.FIELDS_REQUIRED').subscribe(msg => {
				this._messageService.error(msg);
			});
		}
		return true;
	}

	removeVolunteer(volunteer: Volunteer, index: number) {
		if(volunteer) {
			this.socialProjectVolunteerService.delete(volunteer.id).subscribe(res => {
				this._translateService.get('ALERTS.SAVE_SUCCESS').subscribe(msg => {
					this._messageService.success(msg);
				});
				if(index) {
					this.volunteers.splice(index, 1);
				}
			}); 
		}
	}

	makeManager(volunteer: Volunteer) {
		if(volunteer) {
			const socialProjectVolunteer: SocialProjectVolunteer = new SocialProjectVolunteer();
			socialProjectVolunteer.socialProjectVolunteerType = SocialProjectVolunteerType.MANAGER;
			socialProjectVolunteer.socialProject = new SocialProject();
			socialProjectVolunteer.socialProject.id = this.fgSp.get('id') ? this.fgSp.get('id').value : undefined;
			socialProjectVolunteer.volunteer = new Volunteer();
			socialProjectVolunteer.volunteer.id = volunteer.id;
	
			this.socialProjectVolunteerService.save(socialProjectVolunteer).subscribe(res => {
				this._translateService.get('ALERTS.SAVE_SUCCESS').subscribe(msg => {
					this._messageService.success(msg);
				});
			});
	
			volunteer.socialProjectVolunteerType = SocialProjectVolunteerType.MANAGER;
		}
	}

	isManager(): boolean {
		return this.socialProjectVolunteerType == SocialProjectVolunteerType.MANAGER;
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

}
