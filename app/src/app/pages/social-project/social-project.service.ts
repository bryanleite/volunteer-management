import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { SocialProject } from "src/app/domain/social-project";
import { SocialProjectVolunteer } from "src/app/domain/socialProjectVolunteer";

@Injectable({
	providedIn: 'root'
})
export class SocialProjectService {

	constructor(private http: HttpClient) {}
	
	private static API = `${environment.api}/social-project`;

	save(socialProject: SocialProject): Observable<SocialProject> {
        return this.http.post<SocialProject>(SocialProjectService.API, socialProject);
    }

    edit(id: number): Observable<SocialProject> {
        return this.http.get<SocialProject>(`${SocialProjectService.API}/${id}`);
	}
	
	getSocialProjectVolunteerType(userId: number, socialProjectId: number): Observable<string> {
		let params = new HttpParams().set("userId", userId.toString()).set("socialProjectId", socialProjectId.toString());
		return this.http.get<string>(`${environment.api}/social-project-volunteer/volunteer-type`, {
			params: params
		});
	}

	saveManager(socialProjectVolunteer: SocialProjectVolunteer): Observable<SocialProjectVolunteer> {
		return this.http.post<SocialProjectVolunteer>(`${environment.api}/social-project-volunteer`, socialProjectVolunteer);
	}

}