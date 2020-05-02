import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Profile } from '../../security/auth/profile';
import { TableService } from '../../shared/table/table.service';
import { ProfilesService } from './profiles.service';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { NzModalService, NzMessageService } from 'ng-zorro-antd';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.less']
})
export class ProfilesComponent implements OnInit {
  private _profiles: Profile[];

  public displayData: Profile[];
  public tableParams: any;
  public filter = new FormControl();

  constructor(
    private _router: Router,
    private _tableService: TableService,
    private _profilesService: ProfilesService,
    private _modalService: NzModalService,
    private _translateService: TranslateService,
    private _messageService: NzMessageService,
    public route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.tableParams = {
      pageIndex: 1,
      pageSize: 10,
      total: 1,
      sortKey: null,
      sortValue: null,
      searchValue: null,
      dataset: []
    }

    this.filter.valueChanges
      .pipe(
        debounceTime(1000)
      )
      .subscribe(v => this.tableParams.searchValue = v && this.getProfiles());

    this.getProfiles();
  }

  addProfile() {
    this._router.navigate(['admin-settings', 'profiles']);
  }

  sort(sort: { key: string, value: string }): void {
    this.tableParams.sortKey = sort.key;
    this.tableParams.sortValue = sort.value;
    this.getProfiles();
  }

  getProfiles(reset?: boolean) {
    if (reset) {
      this.tableParams.pageIndex = 1;
    }

    this._profilesService.getProfilesByFilter(this.tableParams.pageIndex, this.tableParams.pageSize, this.tableParams.sortKey, this.tableParams.sortValue, this.tableParams.searchValue)
      .subscribe(r => {
        this.tableParams.total = r.length;
        this.tableParams.dataset = r;
      });
  }

  edit(profile: Profile) {
    this._router.navigate(['admin-settings', 'profiles', profile.id]);
  }

  remove(profile: Profile) {
    this._translateService
      .get([
        'ADMIN_SETTINGS.PROFILES.QUESTION_REMOVE_TITLE',
        'ADMIN_SETTINGS.PROFILES.QUESTION_REMOVE_CONTENT',
        'ADMIN_SETTINGS.PROFILES.YES',
        'ADMIN_SETTINGS.PROFILES.NO'
      ], { profileName: profile.name })
      .subscribe(values => {
        this._modalService.confirm({
          nzTitle: values['ADMIN_SETTINGS.PROFILES.QUESTION_REMOVE_TITLE'],
          nzContent: values['ADMIN_SETTINGS.PROFILES.QUESTION_REMOVE_CONTENT'],
          nzOkText: values['ADMIN_SETTINGS.PROFILES.YES'],
          nzOkType: 'danger',
          nzOnOk: () => {
            this._profilesService.removeProfile(profile.id).subscribe(r => {
              this._translateService.get('ADMIN_SETTINGS.PROFILES.SUCCESS_REMOVE').subscribe(v => { 
                this._messageService.success(v);
                this.getProfiles(); 
              });
            });
          },
          nzCancelText: values['ADMIN_SETTINGS.PROFILES.NO']
        });
      })
  }
}
