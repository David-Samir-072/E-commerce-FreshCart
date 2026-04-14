import { effect, inject, Injectable, signal } from '@angular/core';
import { MystorageService } from './mystorage.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class CartInLocalStorageService {

  cartList = signal<IcartProduct[]>([]);
  private readonly mystorageService = inject(MystorageService)


  constructor() {
    if (this.mystorageService.get('cartList')) {
      this.cartList.set(JSON.parse(this.mystorageService.get('cartList')!))
    }

    effect(() => this.mystorageService.set('cartList', JSON.stringify(this.cartList())))
  }



  addToCart(product: Iproduct, count: number = 1,accumulate=true) {
    const index = this.cartList().findIndex((prod) => prod._id === product._id)
    if (index === -1) {
      this.cartList.update(list => [...list, this.mapToCartProduct(product, count)]);
    } else {
      this.updateItemInCart(product._id, accumulate?this.cartList().at(index)!.count + count:count);
    }
  }

  updateItemInCart(productId: string, count: number) {
    this.cartList.update((list => list.map((item) =>
      item.product._id === productId ? { ...item, count: count } : item)));
  }

  removeFromCart(productId: string) {
    this.cartList.update(list => list.filter((item) => item.product._id != productId)
    );
  }
  ClearCart() {
    this.cartList.set([]);
  }
  calculateTotalPrice(): number {
    return this.cartList().reduce((total, item) => total += item.count * item.price, 0)
  }


  private mapToCartProduct(product: Iproduct, count: number = 1): IcartProduct {
    return {
      _id: product._id,
      price: product.price,
      count: count,
      product: {
        subcategory: product.subcategory,
        _id: product._id,
        title: product.title,
        slug: product.slug,
        quantity: product.quantity,
        imageCover: product.imageCover,
        category: product.category,
        brand: product.brand,
        ratingsAverage: product.ratingsAverage,
        id: product.id
      }
    };
  }
}
