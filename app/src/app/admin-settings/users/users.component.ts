import { Component, OnInit } from '@angular/core';
import { User } from '../../security/auth/user';
import { FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UsersService } from './users.service';
import { debounceTime } from 'rxjs/operators';
import { ProfilesService } from '../profiles/profiles.service';

@Component({
  selector: 'app-user',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.less']
})
export class UsersComponent implements OnInit {
  public displayData: User[];
  public tableParams: any;
  public filter = new FormControl();

  constructor(
    private _router: Router,
    private _usersService: UsersService,
    private _profilesService: ProfilesService,
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
      .subscribe(v => this.tableParams.searchValue = v && this.getUsers());

    this.getUsers();
  }

  sort(sort: { key: string, value: string }): void {
    this.tableParams.sortKey = sort.key;
    this.tableParams.sortValue = sort.value;
    this.getUsers();
  }

  getUsers(reset?: boolean) {
    if (reset) {
      this.tableParams.pageIndex = 1;
    }

    this._usersService.getUsers(this.tableParams.pageIndex, this.tableParams.pageSize, this.tableParams.sortKey, this.tableParams.sortValue, this.tableParams.searchValue)
      .subscribe(r => {
        this.tableParams.total = r.length;
        this.tableParams.dataset = r;
      });
  }

  edit(user: User) {
    this._router.navigate(['admin-settings', 'users', user.id]);
  }

  getProfilesSeparatedByComma(user: User): string {
    return this._profilesService.getProfilesSeparatedByComma(user.profiles);
  }

  addUser() {
    this._router.navigate(['admin-settings', 'users']);
  }

}
