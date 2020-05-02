import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
}
