import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpErrorResponse,
} from '@angular/common/http';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { HttpErrorHandler } from './http-error.handler';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

    constructor(private _httpErrorHandler: HttpErrorHandler) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req)
            .pipe(
                tap((event: HttpEvent<any>) => { }, (err: any) => {
                    if (err instanceof HttpErrorResponse) {
                        this._httpErrorHandler.handleError(err);
                    }
                })
            );
    }
}
