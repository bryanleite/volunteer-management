import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { State } from "src/app/domain/state";
import { HttpClient } from "@angular/common/http";
import { City } from "src/app/domain/city";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class LocationService {

    constructor(private http: HttpClient) {}

    private static API = environment.locationApi;

    getAllStates(): Observable<State[]> {
        let headers = {'No-Auth': 'True'};
        return this.http.get<State[]>(LocationService.API, {
            headers: headers
        });
    }

    getCitiesByUF(uf: string): Observable<City[]> {
        let headers = {'No-Auth': 'True'};
        return this.http.get<City[]>(`${LocationService.API}/${uf}/distritos`, {
            headers: headers
        });
    }

}