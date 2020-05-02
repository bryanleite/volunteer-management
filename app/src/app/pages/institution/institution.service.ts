import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Institution } from '../../domain/institution';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class InstitutionService {

    private static API = `${environment.api}/institutions`;

    constructor(private http: HttpClient) { }

    save(institution: Institution): Observable<Institution> {
		return this.http.post<Institution>(InstitutionService.API, institution);
    }

    update(institution: Institution): Observable<Institution> {
        return this.save(institution);
    }

    delete(id: number): Observable<any> {
        return this.http.post(`${InstitutionService.API}/delete/${id}`, {});
    }

    edit(id: number): Observable<Institution> {
        return this.http.get<Institution>(`${InstitutionService.API}/${id}`);
    }

    getInstitutions(term?: string): Observable<Institution[]> {
        return this.http.get<Institution[]>(InstitutionService.API);
    }

    getInstitutionsByFilter(pageIndex: number, pageSize: number, sortKey: string, sortValue: string, searchValue: string): Observable<Institution[]> {
        return this.http.get(InstitutionService.API)
          .pipe(
            map(r => {
              return <Institution[]>r;
            })
          )
      }

}
