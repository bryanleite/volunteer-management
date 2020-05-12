import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Skill } from "src/app/domain/skill";

@Injectable({
    providedIn: 'root'
})
export class SkillService {
    private static API = `${environment.api}/skill`;

    constructor(private http: HttpClient) { }


    findAll(isNoAuth?: boolean): Observable<Skill[]> {
        let headers = isNoAuth ? {'No-Auth': 'True'} : {};

        return this.http.get<Skill[]>(SkillService.API, {
            headers: headers
        });
    }

    save(skill: Skill, isNoAuth?: boolean): Observable<Skill> {
        let headers = isNoAuth ? {'No-Auth': 'True'} : {};
        return this.http.post<Skill>(SkillService.API, skill, {
            headers: headers
        });
    }
}