import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormOperation } from '../../../shared/form/form-operation.enum';
import { Profile } from '../../../security/auth/profile';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { FormService } from '../../../shared/form/form.service';
import { ProfilesService } from '../profiles.service';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { TranslateService } from '@ngx-translate/core';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-profile-detail',
  templateUrl: './profile-detail.component.html',
  styleUrls: ['./profile-detail.component.less']
})
export class ProfileDetailComponent implements OnInit {
  public FormOperation = FormOperation;
  public formOperation: FormOperation = FormOperation.ADD;
  public profileForm: FormGroup;
  public profile: Profile;

  constructor(
    private _activatedRouter: ActivatedRoute,
    private _fb: FormBuilder,
    private _formService: FormService,
    private _profilesService: ProfilesService,
    private _messageService: NzMessageService,
    private _router: Router,
    private _modalService: NzModalService,
    public translate: TranslateService) {
    this.profileForm = this._fb.group({
      name: [null, [Validators.required]],
      active: [false]
    });
  }

  ngOnInit() {
    this._activatedRouter.params.subscribe(p => {
      if (p.profileId) {
        this.formOperation = FormOperation.EDIT;
        this._profilesService.getProfileById(p.profileId).subscribe((p: Profile) => {
          this.profile = p;
          this.loadFormGroup(this.profile);
        });
      }
    });

  }

  loadFormGroup(profile?: Profile) {
    if (profile) {
      this.profileForm.get('name').setValue(profile.name);
      this.profileForm.get('active').setValue(profile.active);
    }
  }

  save(): void {
    this._formService.submitForm(this.profileForm);

    if (this.profileForm.valid) {
      let profile = new Profile();
      profile.id = this.profile ? this.profile.id : undefined;
      profile.name = this.profileForm.get('name').value;
      profile.active = this.profileForm.get('active').value;
      profile.authorities = [];

      if (this.formOperation == FormOperation.ADD) {
        this._profilesService.saveProfile(profile).subscribe(r => {
          this.translate.get('ADMIN_SETTINGS.PROFILES.PROFILE_DETAIL.SUCCESS_SAVE').subscribe(v => {
            this._messageService.success(v);
            this._router.navigate(['admin-settings', 'profiles', 'list']);
          })
        })
      } else {
        this._profilesService.updateProfile(profile).subscribe(r => {
          this.translate.get('ADMIN_SETTINGS.PROFILES.PROFILE_DETAIL.SUCCESS_UPDATE').subscribe(v => {
            this._messageService.success(v);
            this._router.navigate(['admin-settings', 'profiles', 'list']);
          })
        })
      }
    }
  }

  isInputInvalid(cName: string): boolean {
    const input = this.profileForm.controls[cName];
    return this._formService.hasError(input);
  }

  getInputMsgError(cName: string) {
    const input = this.profileForm.controls[cName];
    return (this.isInputInvalid(cName)) ? this._formService.handleMsgInputInvalid(input) : '';
  }

  cancel() {
    this.translate
      .get(['ADMIN_SETTINGS.PROFILES.PROFILE_DETAIL.QUESTION_CANCEL_TITLE', 'ADMIN_SETTINGS.PROFILES.PROFILE_DETAIL.QUESTION_CANCEL_CONTENT'])
      .subscribe((values) => {
        this._modalService.confirm({
          nzTitle: '<i>' + values['ADMIN_SETTINGS.PROFILES.PROFILE_DETAIL.QUESTION_CANCEL_TITLE'] + '</i>',
          nzContent: values['ADMIN_SETTINGS.PROFILES.PROFILE_DETAIL.QUESTION_CANCEL_CONTENT'],
          nzOnOk: () => this._router.navigate(['admin-settings', 'profiles', 'list'])
        });
      })
  }
}
