import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { SocialProject } from "src/app/domain/social-project";
import { SocialProjectDTO } from "src/app/domain/social-project-dto";

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

	getMySocialProjects(volunteerId: number): Observable<SocialProjectDTO[]> {
		let params = new HttpParams().set("volunteerId", volunteerId.toString());
		return this.http.get<SocialProjectDTO[]>(`${SocialProjectService.API}/by-volunteer`, {
			params: params
		});
	}

	getSocialProjectByFilters(state?: string, city?:string, institution?: string ): Observable<SocialProjectDTO[]> {
		return this.http.get<SocialProjectDTO[]>(`${SocialProjectService.API}`);		
	}

}