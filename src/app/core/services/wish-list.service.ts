import { effect, inject, Injectable, signal } from '@angular/core';
import { MystorageService } from './mystorage.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class WishListService {

  private readonly httpClient = inject(HttpClient)

  wishListIds=signal<string[]>([])

  addProductToWishlist(productId: string): Observable<any> {
    return this.httpClient.post(`${environment.baseUrl}/api/v1/wishlist`, {
      "productId": productId
    })
  }

  removeProductFromWishlist(productId: string): Observable<any> {
    return this.httpClient.delete(`${environment.baseUrl}/api/v1/wishlist/${productId}`)
  }
  getLoggedUserWishlist(): Observable<any> {
    return this.httpClient.get(`${environment.baseUrl}/api/v1/wishlist`)
  }











  // wishList = signal<IlocalProduct[]>([]);
  // private readonly mystorageService = inject(MystorageService)


  // constructor() {
  //   if (this.mystorageService.get('wishList')) {
  //     this.wishList.set(JSON.parse(this.mystorageService.get('wishList')!))
  //   }
  //   effect(() => this.mystorageService.set('wishlist', JSON.stringify(this.wishList())))

  // }
}
