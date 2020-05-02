import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TableService {

  constructor() { }

  sort(sort: { key: string, value: string }, data: any[]): any[] {
    return data.sort((a, b) => (sort.value === 'ascend') ? (a[sort.key] > b[sort.key] ? 1 : -1) : (b[sort.key] > a[sort.key] ? 1 : -1));
  }
}
