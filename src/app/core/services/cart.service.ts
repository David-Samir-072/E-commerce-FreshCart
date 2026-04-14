import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {

  private readonly httpClient = inject(HttpClient)
  numOfCartItems=signal<number>(0)

  addProductToCart(productId: string): Observable<any> {
    return this.httpClient.post(`${environment.baseUrl}/api/v2/cart`, {
      "productId": productId
    })
  }


  getLoggedUserCart(): Observable<any> {
    return this.httpClient.get(`${environment.baseUrl}/api/v2/cart`)
  }

  UpdateCartProductQuantity(productId: string, count: number): Observable<any> {
    return this.httpClient.put(`${environment.baseUrl}/api/v2/cart/${productId}`, {
      "count": count
    })
  }
  RemoveProductFromCart(productId: string): Observable<any> {
    return this.httpClient.delete(`${environment.baseUrl}/api/v2/cart/${productId}`)
  }
  ClearUserCart(): Observable<any> {
    return this.httpClient.delete(`${environment.baseUrl}/api/v2/cart`)
  }
  createCashOrder(cartId: string, data: object): Observable<any> {
    return this.httpClient.post(`${environment.baseUrl}/api/v1/orders/${cartId}`, data)
  }
  createVisaOrder(cartId: string, data: object): Observable<any> {
    return this.httpClient.post(`${environment.baseUrl}/api/v1/orders/checkout-session/${cartId}?url=${environment.URL}`, data)
  }

  getUserOrders(cartOwnerId: string): Observable<any> {
    return this.httpClient.get(`${environment.baseUrl}/api/v1/orders/user/${cartOwnerId}`)
  }


}
