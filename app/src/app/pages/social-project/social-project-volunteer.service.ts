import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { SocialProjectVolunteer } from "src/app/domain/socialProjectVolunteer";
import { Volunteer } from "src/app/domain/volunteer";

@Injectable({
    providedIn: 'root'
})
export class SocialProjectVolunteerService {

    private static API = `${environment.api}/social-project-volunteer`;

    constructor(private http: HttpClient) { }

    getSocialProjectVolunteers(socialProjectId: number): Observable<Volunteer[]> {
        let params = new HttpParams().set("socialProjectId", socialProjectId.toString());
        return this.http.get<Volunteer[]>(`${SocialProjectVolunteerService.API}/volunteers`, {
            params: params            
        });
    }

    getSocialProjectVolunteerType(userId: number, socialProjectId: number): Observable<string> {
        let params = new HttpParams().set("userId", userId.toString()).set("socialProjectId", socialProjectId.toString());
        return this.http.get<string>(`${SocialProjectVolunteerService.API}/volunteer-type`, {
            params: params
        });
    }

    save(socialProjectVolunteer: SocialProjectVolunteer): Observable<SocialProjectVolunteer> {
        return this.http.post<SocialProjectVolunteer>(SocialProjectVolunteerService.API, socialProjectVolunteer);
    }

    delete(socialProjectVolunteerId: number): Observable<string> {
        return this.http.get<string>(`${SocialProjectVolunteerService.API}/delete/${socialProjectVolunteerId}`);
    }

}