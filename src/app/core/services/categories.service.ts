import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  private readonly httpClient=inject(HttpClient)

  

  getAllCategories(pageNumber: number = 1): Observable<any> {
    return this.httpClient.get(`${environment.baseUrl}/api/v1/categories?page=${pageNumber}`)
  }

  getSpecificCategory(categoryId:string):Observable<any>{
    return this.httpClient.get(`${environment.baseUrl}/api/v1/categories/${categoryId}`)
  }



  getAllSubcategoriesOnCategory(categoryId: string): Observable<any> {
    return this.httpClient.get(`${environment.baseUrl}/api/v1/categories/${categoryId}/subcategories`)
  }

   getSpecificSubcategory(subcategoryId:string):Observable<any>{
    return this.httpClient.get(`${environment.baseUrl}/api/v1/subcategories/${subcategoryId}`)
  }
}
