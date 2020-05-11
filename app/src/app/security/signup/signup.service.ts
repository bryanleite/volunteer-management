import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class SignupService {

    private static API_USERS = `${environment.api}/users`;

    constructor(private http: HttpClient){}
    

}