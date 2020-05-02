import { Injectable } from '@angular/core';
import { versions } from '../../environments/versions';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {

  constructor() { }

  getVersion(): string {
    if (environment.production) {
      return `${versions.version}-${versions.timestamp}`;
    } else {
      return `${versions.version}-${versions.revision}-${versions.branch}-${versions.timestamp}`;
    }
  }
}
