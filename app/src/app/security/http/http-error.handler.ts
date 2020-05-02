import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class HttpErrorHandler {

    constructor(
        private _router: Router,
        private _messageService: NzMessageService,
        private _translate: TranslateService) { }

    public handleError(errorResponse: HttpErrorResponse | any) {
        switch (errorResponse.status) {
            case 401:
                this._translate.get('SECURITY.LOGIN.INVALID_CREDENTIALS').subscribe(v => {
                    this._messageService.error(v);
                });
                this._router.navigate(['/login']);
                break;
            case 403:
                this._router.navigate(['/forbidden']);
                break;
            case 500:
                if (errorResponse.error.responseInfo && errorResponse.error.responseInfo.reasons) {
                    this._messageService.error(errorResponse.error.responseInfo.reasons[0].detail);
                } else {
                    this._translate.get('HTTP.UNEXPECTED_ERROR').subscribe(message => {
                        this._messageService.error(message);
                    });
                }
        }
    }
}
