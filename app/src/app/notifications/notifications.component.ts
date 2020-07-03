import { Component, OnInit } from '@angular/core';
import { NotificationsService } from './notifications.service';
import { Notification } from '../domain/notification';
import { Router } from '@angular/router';

@Component({
	selector: 'app-notifications',
	templateUrl: './notifications.component.html',
	styleUrls: ['./notifications.component.less']
})
export class NotificationsComponent implements OnInit {

	public isVisible: boolean = false;
	public notifications: Notification[];

	constructor(private notificationsService: NotificationsService,
				private router: Router) { }

	ngOnInit() {
	}

	public open() {
		this.getMyNotifications();
	}

	public close() {
		this.isVisible = false;
	}

	getMyNotifications() {
		this.notificationsService.getMyNotifications().subscribe(notifications => {
			this.notifications = notifications;
			this.isVisible = true;
		});
	}

	redirectToNotification(notification: Notification) {
		this.notificationsService.updateNotificationToRead(notification.id);
		this.close();
		this.router.navigate(["pages/" + notification.pageLink, { id: notification.queryParamId }]);
	}
}
