import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Router } from "@angular/router";
import { StorageService } from "../../shared/storage/storage.service";
import { HttpErrorHandler } from "../http/http-error.handler";
import { tap } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private route: Router,
                private _storageService: StorageService,
                private _httpErrorHandler: HttpErrorHandler){
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        req = req.clone();
        
        if (!(req.headers.get('No-Auth') || req.url.indexOf('assets/i18n/') !== -1)) {
            const token = this._storageService.getToken();
            if(token){
                req = req.clone({
                    setHeaders: {Authorization: 'Bearer ' + token}
                });
            } else {
                next.handle(req);
                this.route.navigate(['/login']);
                return;
            }
        }

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