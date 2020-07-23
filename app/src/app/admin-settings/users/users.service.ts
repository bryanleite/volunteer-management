import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { User } from '../../security/auth/user';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable()
export class UsersService {

	constructor(private _http: HttpClient) { }

	getUsers(pageIndex: number, pageSize: number, sortKey: number, sortValue: number, searchValue: string): Observable<User[]> {
		return this._http.get(`${environment.api}/users`)
			.pipe(
				map(r => {
					return <User[]>r;
				})
			)
	}

	createUser(user: User, isNoAuth?: boolean): Observable<User> {
		let headers = isNoAuth ? { 'No-Auth': 'True' } : {};
		return this._http.post<User>(`${environment.api}/users/`, user, {
			headers: headers
		});
	}

	updateUser(user: User): Observable<User> {
		return this._http.put(`${environment.api}/users/` + user.id, user)
			.pipe(
				map(r => {
					return <User>r;
				})
			)
	}

	getUserById(userId: string): Observable<User> {
		return this._http.get(`${environment.api}/users/` + userId)
			.pipe(
				map(r => <User>r)
			)
	}

	makeUserToManager(userId: number, institutionId: number): Observable<any> {
		let params = new HttpParams();
		params = userId ? params.set("userId", userId.toString()) : params;
		params = institutionId ? params.set("institutionId", institutionId.toString()) : params;
		return this._http.post<any>(`${environment.api}/users/make-user-to-manager`, null, {
			params: params
		});
	}

	removerUserInstitution(userId: number): Observable<any> {
		let params = new HttpParams();
		params = userId ? params.set("userId", userId.toString()) : params;
		return this._http.post<any>(`${environment.api}/users/remove-user-institution`, null, {
			params: params
		});
	}
}
