import { Component, OnInit } from '@angular/core';
import { ProfilesService } from '../../profiles/profiles.service';
import { Profile } from '../../../security/auth/profile';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormService } from '../../../shared/form/form.service';
import { User } from '../../../security/auth/user';
import { Observable } from 'rxjs';
import { UsersService } from '../users.service';
import { Router, ActivatedRoute } from '@angular/router';
import { tap, map } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { NzModalService, NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.less']
})
export class UserDetailComponent implements OnInit {
  public profiles$: Observable<Profile[]>;
  public userForm: FormGroup;
  public user: User;

  constructor(
    private _profilesService: ProfilesService,
    private _fb: FormBuilder,
    private _formService: FormService,
    private _userService: UsersService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _translateService: TranslateService,
    private _modalService: NzModalService,
    private _messageService: NzMessageService) {
    this.userForm = this._fb.group({
      profiles: [null, [Validators.required]],
      active: [null]
    });
  }

  ngOnInit(): void {
    this._activatedRoute.params.subscribe(params => {
      if (params) {
        this._userService.getUserById(params['userId']).subscribe(res => {
          this.user = res;
          this.loadFormGroup(this.user);
        })
      }
    })

    this.getProfiles();

    this.userForm.get('active').valueChanges.subscribe(value => {
      value ? this.userForm.get('profiles').enable() : this.userForm.get('profiles').disable();
    })
  }

  loadFormGroup(user: User) {
    this.userForm.get('active').setValue(user.active);
    this.userForm.get('profiles').setValue(user.profiles);
  }

  getProfiles() {
    this.profiles$ = this._profilesService.getProfiles();
  }

  isInputInvalid(cName: string): boolean {
    const input = this.userForm.controls[cName];
    return this._formService.hasError(input);
  }

  getInputMsgError(cName: string) {
    const input = this.userForm.controls[cName];
    return (this.isInputInvalid(cName)) ? this._formService.handleMsgInputInvalid(input) : '';
  }

  compareProfiles(p1: Profile, p2: Profile) {
    return p1 && p2 && p1.id === p2.id;
  }

  cancel() {
    this._translateService
      .get(['ADMIN_SETTINGS.USERS.USER_DETAIL.QUESTION_CANCEL_TITLE', 'ADMIN_SETTINGS.USERS.USER_DETAIL.QUESTION_CANCEL_CONTENT'])
      .subscribe((values) => {
        this._modalService.confirm({
          nzTitle: '<i>' + values['ADMIN_SETTINGS.USERS.USER_DETAIL.QUESTION_CANCEL_TITLE'] + '</i>',
          nzContent: values['ADMIN_SETTINGS.USERS.USER_DETAIL.QUESTION_CANCEL_CONTENT'],
          nzOnOk: () => this._router.navigate(['admin-settings', 'users', 'list'])
        });
      })
  }


  save(): void {
    this._formService.submitForm(this.userForm);

    if (this.userForm.valid) {
      let user = new User();
      user.id = this.user.id;
      user.username = this.user.username;
      user.name = this.user.name;
      user.email = this.user.email;
      user.active = this.userForm.get('active').value;
      user.profiles = this.userForm.get('profiles').value;

      this._userService.updateUser(user).subscribe(r => {
        this._translateService.get('ADMIN_SETTINGS.USERS.USER_DETAIL.SUCCESS_UPDATE').subscribe(v => {
          this._messageService.success(v);
          this._router.navigate(['admin-settings', 'users', 'list']);
        })
      })

    }
  }
}
