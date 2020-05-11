import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { Volunteer } from "src/app/domain/volunteer";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class VolunteerService {
    private static API = `${environment.api}/volunteer`;

    constructor(private http: HttpClient) { }

    save(volunteer: Volunteer): Observable<Volunteer> {
        return this.http.post<Volunteer>(VolunteerService.API, volunteer);
    }
}