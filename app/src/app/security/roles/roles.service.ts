import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StorageService } from '../../shared/storage/storage.service';
import { User } from '../auth/user';
import { StorageKeys } from '../../shared/storage/storage-keys.enum';

@Injectable()
export class RolesService {

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _storageService: StorageService
  ) { }

  isAuthorised(expectedRoles: any[]): boolean {
    let response = true;

    if (expectedRoles) {
      let currentUser: User = JSON.parse(this._storageService.getLocalItem(StorageKeys.USER_KEY));
      let currentRoles = currentUser.currentProfile.authorities.map(r => r.name);

      expectedRoles.forEach(r => {
        if (currentRoles.indexOf(r) < 0) {
          response = false;
        }
      });
    }

    return response;
  }
}
