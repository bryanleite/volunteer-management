import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { UserInformationsDTO } from "../domain/user-informations-dto";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class UserInformationsService {

    private static API = `${environment.api}/user-informations`;

    constructor(private http: HttpClient) { }

    getUserInformations(userId: number): Observable<UserInformationsDTO> {
        return this.http.get<UserInformationsDTO>(`${UserInformationsService.API}/${userId}`);
    }

}