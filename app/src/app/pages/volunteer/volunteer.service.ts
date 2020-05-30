import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Volunteer } from "src/app/domain/volunteer";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class VolunteerService {
    private static API = `${environment.api}/volunteer`;

    constructor(private http: HttpClient) { }

    save(volunteer: Volunteer, isNoAuth?: boolean): Observable<Volunteer> {
        let headers = isNoAuth ? {'No-Auth': 'True'} : {};
        return this.http.post<Volunteer>(VolunteerService.API, volunteer, {
            headers: headers
        });
    }

    getVolunteersWithFilters(socialProjectId: number, formalName?: string, skillId?: number): Observable<Volunteer[]> {
        let params = new HttpParams();
        params = socialProjectId ? params.set("socialProjectId", socialProjectId.toString()) : params;
        params = formalName ? params.set("formalName", formalName) : params;
        params = skillId ? params.set("skillId", skillId.toString()) : params;

        return this.http.get<Volunteer[]>(`${VolunteerService.API}/volunteers-to-invite`, {
            params: params
        });
    }
}