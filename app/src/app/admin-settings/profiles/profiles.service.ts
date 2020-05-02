import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Profile } from '../../security/auth/profile';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';
import { Authority } from '../../security/auth/authority';

@Injectable()
export class ProfilesService {

  constructor(private _http: HttpClient) { }

  getProfilesByFilter(pageIndex: number, pageSize: number, sortKey: string, sortValue: string, searchValue: string): Observable<Profile[]> {
    return this._http.get(`${environment.api}/profiles`)
      .pipe(
        map(r => {
          return <Profile[]>r;
        })
      )
  }

  getProfiles(): Observable<Profile[]> {
    return this._http.get(`${environment.api}/profiles`)
      .pipe(
        map(r => {
          return <Profile[]>r;
        })
      )
  }

  saveProfile(profile: Profile): Observable<Profile> {
    return this._http.post(`${environment.api}/profiles`, profile)
      .pipe(
        map(r => {
          return <Profile>r;
        })
      )
  }

  updateProfile(profile: Profile): Observable<Profile> {
	return this.saveProfile(profile);
  }

  getProfileById(profileId: string): Observable<Profile> {
    return this._http.get(`${environment.api}/profiles/${profileId}`)
      .pipe(
        map(r => <Profile>r)
      )
  }

  getAuthorities(): Observable<Authority[]> {
    return this._http.get(`${environment.api}/authorities/`)
      .pipe(
        map(r => <Authority[]>r)
      )
  }

  removeProfile(profileId: string): Observable<any> {
    return this._http.post(`${environment.api}/profiles/delete/${profileId}`, {})
  }

  getProfilesSeparatedByComma(profiles: Profile[]): string {
    return profiles ? profiles.map(p => p.name).join(', ') : '';
  }
}
