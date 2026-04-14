import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Router } from '@angular/router';
import { MystorageService } from '../../services/mystorage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly mystorageService = inject(MystorageService)
  private readonly httpClient = inject(HttpClient)
  private readonly router = inject(Router)

  isLogged = signal<boolean>(this.mystorageService.getToken() ? true : false)

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

  logOut() {
    localStorage.removeItem('freshToken');
    localStorage.removeItem('freshUser');
    sessionStorage.removeItem('freshToken');
    sessionStorage.removeItem('freshUser');
    this.isLogged.set(false)
    this.router.navigate(['/login'])
  }
}
