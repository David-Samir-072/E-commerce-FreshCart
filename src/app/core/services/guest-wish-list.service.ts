import { effect, inject, Injectable, signal } from '@angular/core';
import { MystorageService } from './mystorage.service';

@Injectable({
  providedIn: 'root',
})
export class GuestWishListService {
  wishList = signal<Iproduct[]>([]);
  private readonly mystorageService = inject(MystorageService)

  constructor() {
    if (this.mystorageService.get('wishList')) {
      this.wishList.set(JSON.parse(this.mystorageService.get('wishList')!))
    }
    effect(() => this.mystorageService.set('wishList', JSON.stringify(this.wishList())))
  }
  addToWishList(product: Iproduct): string[] {
    this.wishList.update(value => [...value, product])
    return this.wishList().map(item => item._id)

  }
  removeFromWishList(product: Iproduct): string[] {
    this.wishList.update(value => value.filter(item => item._id !== product._id))
    return this.wishList().map(item => item._id)

  }
  getWishListIds(): string[] {
    return this.wishList().map(item => item._id)

  }

}
