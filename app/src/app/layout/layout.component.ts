import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../shared/storage/storage.service';
import { User } from '../security/auth/user';
import { StorageKeys } from '../shared/storage/storage-keys.enum';
import { AuthService } from '../security/auth/auth.service';
import { LayoutService } from './layout.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.less']
})
export class LayoutComponent implements OnInit {
  isCollapsed = false;
  triggerTemplate = null;
  @ViewChild('trigger') customTrigger: TemplateRef<void>;

  public user: User;
  public version: string;


  constructor(
    public router: Router,
    private _storageService: StorageService,
    private _authService: AuthService,
    private _layoutService: LayoutService) { }

  ngOnInit() {
    this.user = JSON.parse(this._storageService.getLocalItem(StorageKeys.USER_KEY));
    this.version = this._layoutService.getVersion();
  }

  /** custom trigger can be TemplateRef **/
  changeTrigger(): void {
    this.triggerTemplate = this.customTrigger;
  }

  logout() {
    this._authService.logout();
  }

}
