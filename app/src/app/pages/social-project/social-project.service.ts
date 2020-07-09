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

	getMySocialProjects(): Observable<SocialProjectDTO[]> {
		return this.http.get<SocialProjectDTO[]>(`${SocialProjectService.API}/my`);
	}

	getSocialProjectByFilters(state?: string, city?: string, institutionId?: number): Observable<SocialProjectDTO[]> {
		let params = new HttpParams();
		params = state ? params.set('state', state) : params;
		params = city ? params.set('city', city) : params;
		params = institutionId ? params.set('institutionId', institutionId.toString()) : params;
		return this.http.get<SocialProjectDTO[]>(`${SocialProjectService.API}/by-filters`, {
			params: params
		});		
	}

}