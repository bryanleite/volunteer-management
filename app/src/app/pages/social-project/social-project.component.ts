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
import { User } from 'src/app/security/auth/user';
import { SocialProjectVolunteer } from 'src/app/domain/socialProjectVolunteer';

@Component({
	selector: 'app-social-project',
	templateUrl: './social-project.component.html',
	styleUrls: ['./social-project.component.less']
})
export class SocialProjectComponent implements OnInit {

	private static MANAGER = "MANAGER";
	public accessType: string; // MANAGER / VOLUNTEER / CANDIDATE / NO_VOLUNTEER
	
	public institution: Institution;
	private currentVolunteer: Volunteer;
	private volunteers: Volunteer[];
	public fgSp: FormGroup;

	constructor(private _activatedRouter: ActivatedRoute,
				private storageService: StorageService,
				private _translateService: TranslateService,
				private _messageService: NzMessageService,
				private socialProjectService: SocialProjectService,
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
				this.socialProjectService.edit(p.id).subscribe(socialProject => {
					this.institution = socialProject.institution;
					this.buildForm(socialProject);
					this.socialProjectService.getSocialProjectVolunteerType(user.id, p.id).subscribe(socialProjectVolunteerType => {
						this.accessType = socialProjectVolunteerType;
					});
				});
			} else {
				this.accessType = SocialProjectComponent.MANAGER;
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

			this.socialProjectService.save(this.getSocialProjectFromForm()).subscribe(socialProject => {
				if(socialProject && this.currentVolunteer) {
					const socialProjectVolunteer: SocialProjectVolunteer = new SocialProjectVolunteer();
					socialProjectVolunteer.socialProjectVolunteerType = 'MANAGER';
					socialProjectVolunteer.socialProject = new SocialProject();
					socialProjectVolunteer.socialProject.id = socialProject.id;
					socialProjectVolunteer.volunteer = new Volunteer();
					socialProjectVolunteer.volunteer.id = this.currentVolunteer.id;

					this.socialProjectService.saveManager(socialProjectVolunteer).subscribe(res => {
						this._translateService.get('ALERTS.SAVE_SUCCESS').subscribe(msg => {
							this._messageService.success(msg);
						});
					});

					this.buildForm(socialProject);
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

	isManager(): boolean {
		return this.accessType == SocialProjectComponent.MANAGER;
	}

}
