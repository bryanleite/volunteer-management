import { Injectable } from '@angular/core';
import { StorageKeys } from './storage-keys.enum';


@Injectable()
export class StorageService {

  constructor() { }

  getToken(): string {
    return window.localStorage.getItem(StorageKeys.TOKEN_KEY);
  }

  removeToken() {
    window.localStorage.removeItem(StorageKeys.TOKEN_KEY);
  }

  setToken(token: string) {
    window.localStorage.setItem(StorageKeys.TOKEN_KEY, token);
  }

  getLocalItem(key: string) {
    return window.localStorage.getItem(key);
  }

  setLocalItem(key: string, value: any): void {
    window.localStorage.setItem(key, JSON.stringify(value));
  }

  removeLocalItem(key: string): void {
    window.localStorage.removeItem(key);
  }

  getSessionItem(key: string) {
    return JSON.parse(window.sessionStorage.getItem(key));
  }

  setSessionItem(key: string, value: any) {
    return window.sessionStorage.setItem(key, JSON.stringify(value));
  }

  removeSessionItem(key: string): void {
    window.sessionStorage.removeItem(key);
  }

}
