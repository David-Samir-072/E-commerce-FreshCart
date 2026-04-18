import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Router } from '@angular/router';
import { MystorageService } from '../../services/mystorage.service';
import { WishListService } from '../../services/wish-list.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly mystorageService = inject(MystorageService)
  private readonly wishListService = inject(WishListService)
  private readonly httpClient = inject(HttpClient)
  private readonly router = inject(Router)

  isLogged = signal<boolean>(this.mystorageService.getToken() ? true : false)
  user = signal<Iuser>({} as Iuser)

  signUp(data: object): Observable<any> {
    return this.httpClient.post(`${environment.baseUrl}/api/v1/auth/signup`, data)
  }

  signIn(data: object): Observable<any> {
    return this.httpClient.post(`${environment.baseUrl}/api/v1/auth/signin`, data)
  }

  forgetPassword(data: object): Observable<any> {
    return this.httpClient.post(`${environment.baseUrl}/api/v1/auth/forgotPasswords`, data)
  }
  verifyCode(data: object): Observable<any> {
    return this.httpClient.post(`${environment.baseUrl}/api/v1/auth/verifyResetCode`, data)
  }
  resetPassword(data: object): Observable<any> {
    return this.httpClient.put(`${environment.baseUrl}/api/v1/auth/resetPassword`, data)
  }
  changePassword(data: object): Observable<any> {
    return this.httpClient.put(`${environment.baseUrl}/api/v1/users/changeMyPassword`, data)
  }
  updateLoggedUser(data: object): Observable<any> {
    return this.httpClient.put(`${environment.baseUrl}/api/v1/users/updateMe/`, data)
  }
  verifyToken(): Observable<any> {
    return this.httpClient.get(`${environment.baseUrl}/api/v1/auth/verifyToken`)
  }

  logOut() {
    localStorage.removeItem('freshToken');
    localStorage.removeItem('freshUser');
    localStorage.removeItem('userId');
    sessionStorage.removeItem('freshToken');
    sessionStorage.removeItem('freshUser');
    sessionStorage.removeItem('userId');
    this.wishListService.wishListIds.set([])
    this.isLogged.set(false)
    
    this.router.navigate(['/login'])
  }
}
