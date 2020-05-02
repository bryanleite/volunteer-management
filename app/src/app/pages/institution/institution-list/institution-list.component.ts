import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { InstitutionService } from '../institution.service';
import { NzModalService, NzMessageService } from 'ng-zorro-antd';
import { TranslateService } from '@ngx-translate/core';
import { Institution } from '../../../domain/institution';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-institution-list',
  templateUrl: './institution-list.component.html',
  styleUrls: ['./institution-list.component.less']
})
export class InstitutionListComponent implements OnInit {
  private _institutions: Institution[];

  public displayData: Institution[];
  public tableParams: any;
  public filter = new FormControl();

  constructor(
    private _router: Router,
    private _institutionService: InstitutionService,
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
      .subscribe(v => this.tableParams.searchValue = v && this.getInstitutions());

    this.getInstitutions();
  }

  addInstitution() {
    this._router.navigate(['pages', 'institutions']);
  }

  sort(sort: { key: string, value: string }): void {
    this.tableParams.sortKey = sort.key;
    this.tableParams.sortValue = sort.value;
    this.getInstitutions();
  }

  getInstitutions(reset?: boolean) {
    if (reset) {
      this.tableParams.pageIndex = 1;
    }

    this._institutionService.getInstitutionsByFilter(this.tableParams.pageIndex, this.tableParams.pageSize, this.tableParams.sortKey, this.tableParams.sortValue, this.tableParams.searchValue)
      .subscribe(r => {
        this.tableParams.total = r.length;
        this.tableParams.dataset = r;
      });
  }

  edit(institution: Institution) {
    this._router.navigate(['pages', 'institutions', institution.id]);
  }
}
