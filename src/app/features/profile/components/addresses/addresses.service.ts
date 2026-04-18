import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AddressesService {
  private readonly httpClient=inject(HttpClient)

  addAddress(data:object):Observable<any>{
    return this.httpClient.post(`${environment.baseUrl}/api/v1/addresses`,data)
  }
  removeAddress(adddressId:string):Observable<any>{
    return this.httpClient.delete(`${environment.baseUrl}/api/v1/addresses/${adddressId}`)
  }
  getLoggedUserAddresses():Observable<any>{
    return this.httpClient.get(`${environment.baseUrl}/api/v1/addresses`)
  }
}
 