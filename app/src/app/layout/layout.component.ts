import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../shared/storage/storage.service';
import { AuthService } from '../security/auth/auth.service';
import { LayoutService } from './layout.service';
import { NotificationsComponent } from '../notifications/notifications.component';
import { UserInformationsComponent } from '../user-informations/user-informations.component';

@Component({
	selector: 'app-layout',
	templateUrl: './layout.component.html',
	styleUrls: ['./layout.component.less']
})
export class LayoutComponent implements OnInit {
	isCollapsed = false;
	triggerTemplate = null;
	@ViewChild('trigger') customTrigger: TemplateRef<void>;

	public user: any;
	public version: string;

	@ViewChild(NotificationsComponent)
	private notificationsComponent: NotificationsComponent;

	@ViewChild(UserInformationsComponent)
	private userInformations: UserInformationsComponent;

	constructor(
		public router: Router,
		private storageService: StorageService,
		private _authService: AuthService,
		private _layoutService: LayoutService) { }

	ngOnInit() {
		this.user = JSON.parse(this.storageService.getUser());
		this.version = this._layoutService.getVersion();
	}

	/** custom trigger can be TemplateRef **/
	changeTrigger(): void {
		this.triggerTemplate = this.customTrigger;
	}

	logout() {
		this._authService.logout();
	}

	isAdmin(): boolean {
		return this.user.admin == true;
	}

	redirectTo(route: string) {
		this.router.navigate([route]);		
	}

	openNotifications() {
		this.notificationsComponent.open();
	}

	openUserInformations() {
		this.userInformations.loadUserAndOpen(this.user.id, false);
	}

}
