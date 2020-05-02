import { Component, OnInit } from '@angular/core';

import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { FormService } from '../../shared/form/form.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Login } from './login';
import { StorageService } from '../../shared/storage/storage.service';
import { StorageKeys } from '../../shared/storage/storage-keys.enum';
import { logging } from 'protractor';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {
  invalidCredentials: boolean;

  constructor(
    private fb: FormBuilder,
    private _authService: AuthService,
    private _formService: FormService,
    private _router: Router,
    public translate: TranslateService,
    private _storageService: StorageService,
    private _messageService: NzMessageService) {
  }

  ngOnInit(): void {
    let login: Login = JSON.parse(this._storageService.getLocalItem(StorageKeys.LOGIN_KEY));

    this.loginForm = this.fb.group({
      username: [login && login.remember ? login.username : null, [Validators.required]],
      password: [login && login.remember ? login.password : null, [Validators.required]],
      remember: [login && login.remember ? login.remember : false]
    });
  }

  loginForm: FormGroup;

  submitForm(): void {
    this._formService.submitForm(this.loginForm);

    if (this.loginForm.valid) {
      this._authService.login(this.loginForm.value).subscribe(
        (res) => {
          this._router.navigate(['/home']);
        }, (e) => {
          this.translate.get('SECURITY.LOGIN.INVALID_CREDENTIALS').subscribe(msg => {
            this._messageService.error(msg);
          });
        });
    }
  }

  isInputInvalid(cName: string): boolean {
    const input = this.loginForm.controls[cName];
    return this._formService.hasError(input);
  }

  getInputMsgError(cName: string) {
    const input = this.loginForm.controls[cName];
    return (this.isInputInvalid(cName)) ? this._formService.handleMsgInputInvalid(input) : '';
  }

}
