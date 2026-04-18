import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BrandService {

  private readonly httpClient=inject(HttpClient)

  getAllBrands(pageNumber:number=1,limit=50):Observable<any>
  {
    return this.httpClient.get(`${environment.baseUrl}/api/v1/brands?page=${pageNumber}&limit=${limit}`)
  }
  getSpecificBrand(brandId:string):Observable<any>
  {
    return this.httpClient.get(`${environment.baseUrl}/api/v1/brands/${brandId}`)
  }
}
