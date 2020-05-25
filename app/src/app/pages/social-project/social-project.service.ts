import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { SocialProject } from "src/app/domain/social-project";

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

}