import { Injectable } from '@angular/core';
import { StorageService } from '../../shared/storage/storage.service';
import { Router } from '@angular/router';
import { Login } from '../login/login';
import { User } from './user';
import { Profile } from './profile';
import { Authority } from './authority';
import { StorageKeys } from '../../shared/storage/storage-keys.enum';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class AuthService {

    constructor(
        private _storageService: StorageService,
        private _router: Router,
        private _http: HttpClient) { }

    login(login: Login): Observable<User> {
        return this._http.post(`${environment.api}/login`, null, {
            headers: new HttpHeaders({ 'username': login.username, 'password': login.password, 'No-Auth': 'True' })
        }).pipe(
            map((res: Response) => {
                const token = res['token'];
                if (token) {
                    this._storageService.setToken(token);
                    if (login.remember) {
                        this._storageService.setLocalItem(StorageKeys.LOGIN_KEY, login);
                    } else {
                        this._storageService.removeLocalItem(StorageKeys.LOGIN_KEY);
                    }

                    const user: User = new User();
                    user.username = res['username'];
                    this._storageService.setLocalItem(StorageKeys.USER_KEY, JSON.stringify(user));
                }
                return null;
            })
        );

    }

    /**
     * Remove user and login preferences from local storage and redirect to login page
     */
    logout() {
        this._storageService.removeLocalItem(StorageKeys.USER_KEY);
        this._storageService.removeToken();
        this._router.navigate(['/login']);
    }

    /**
     * Returns if login is stored in local storage
     */
    userStored(): boolean {
        return this._storageService.getToken() ? true : false;
    }
}
