import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { UserInformationsDTO } from "../domain/user-informations-dto";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Notification } from "../domain/notification";

@Injectable({
    providedIn: 'root'
})
export class NotificationsService {

    private static API = `${environment.api}/notification`;

    constructor(private http: HttpClient) { }

    getMyNotifications(): Observable<Notification[]> {
        return this.http.get<Notification[]>(`${NotificationsService.API}/my-notifications`);
    }

    updateNotificationToRead(id: number) {
        this.http.post(`${NotificationsService.API}/update-to-read/${id}`, {}).subscribe(n => {});
    }

}