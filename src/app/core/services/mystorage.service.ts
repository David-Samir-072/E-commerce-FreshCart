import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MystorageService {
  private readonly pLATFORM_ID = inject(PLATFORM_ID)

  // setLoginData(key: string, value: string, keepMeSigned: boolean = true):void {
  //   if (isPlatformBrowser(this.pLATFORM_ID)) {
  //     keepMeSigned ? localStorage.setItem(key, value) : sessionStorage.setItem(key, value);
  //   }
  // }
  // getLoginData(key: string):string|null {
  //   if (isPlatformBrowser(this.pLATFORM_ID)) {
  //     return localStorage.getItem(key) || sessionStorage.getItem(key);
  //   }
  //   return null;
  // }
  // removeLoginData(key: string):void {
  //   if (isPlatformBrowser(this.pLATFORM_ID)) {
  //     localStorage.removeItem(key)
  //     sessionStorage.removeItem(key)
  //   }
  // }

  getToken(): string | null {
    if (isPlatformBrowser(this.pLATFORM_ID)) {
      return localStorage.getItem('freshToken') || sessionStorage.getItem('freshToken')
    }
    return null
  }
  getUserObject(): string | null {
    if (isPlatformBrowser(this.pLATFORM_ID)) {
      return localStorage.getItem('freshUser') || sessionStorage.getItem('freshUser')
    }
    return null
  }
  getUserId(): string | null {
    if (isPlatformBrowser(this.pLATFORM_ID)) {
      return localStorage.getItem('userId') || sessionStorage.getItem('userId')
    }
    return null
  }

  set(key: string, value: string) {
    if (isPlatformBrowser(this.pLATFORM_ID)) {
      return localStorage.setItem(key, value)
    }
    return null
  }
  get(key: string) {
    if (isPlatformBrowser(this.pLATFORM_ID)) {
      return localStorage.getItem(key)
    }
    return null
  }

  remove(key: string) {
    if (isPlatformBrowser(this.pLATFORM_ID)) {
      localStorage.removeItem(key)
    }
  }
}
