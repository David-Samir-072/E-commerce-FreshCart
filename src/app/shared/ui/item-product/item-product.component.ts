import { Component, computed, inject, input, signal } from '@angular/core';
import { DiscountCalcPipe } from '../../pipes/discount-calc-pipe';
import { RouterLink } from "@angular/router";
import { StarsProductComponent } from "../stars-product/stars-product.component";
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../../core/services/cart.service';
import { CartInLocalStorageService } from '../../../core/services/cart-in-local-storage.service';
import { AuthService } from '../../../core/auth/services/auth.service';
import { WishListService } from '../../../core/services/wish-list.service';

@Component({
  selector: 'app-item-product',
  imports: [DiscountCalcPipe, RouterLink, StarsProductComponent],
  templateUrl: './item-product.component.html',
  styleUrl: './item-product.component.css',
})
export class ItemProductComponent {
  private readonly authService = inject(AuthService)
  private readonly cartService = inject(CartService)
  private readonly wishListService = inject(WishListService)
  private readonly toastrService = inject(ToastrService)
  private readonly cartInLocalStorageService = inject(CartInLocalStorageService)
  product = input.required<Iproduct>();
  isLogged = computed(() => this.authService.isLogged());
  showCheck = signal<boolean>(false);
  loading = signal<boolean>(false);
  favoriteloading = signal<boolean>(false);
  wishListIds = computed<string[]>(() => this.wishListService.wishListIds());

  doCheck() {
    this.showCheck.set(true);
    setTimeout(() => {
      this.showCheck.set(false);
    }, 1500);
  }

  addToCart(product: Iproduct): void {

    if (this.isLogged()) {
      if (this.loading()) return
      this.loading.set(true);
      this.cartService.addProductToCart(product._id).subscribe({
        next: res => {
          this.loading.set(false);
          this.toastrService.success(res.message, '', { progressBar: true, closeButton: true })
          this.cartService.numOfCartItems.set(res.numOfCartItems)
          this.doCheck();
        },
        error: err => {
          this.loading.set(false);
        }
      })

    } else {
      this.cartInLocalStorageService.addToCart(product)
      this.doCheck();
    }

  }


  toggelFavorite(productId: string) {

    if (this.isLogged()) {
      if (this.favoriteloading()) return

      this.favoriteloading.set(true)
      // already in favorite
      if (this.wishListService.wishListIds().includes(productId)) {
        this.wishListService.removeProductFromWishlist(productId).subscribe({
          next: res => {
            this.wishListService.wishListIds.set(res.data)
            this.favoriteloading.set(false)
          },
          error: err => {
            this.favoriteloading.set(false)
          }
        })
      } else {
        this.wishListService.addProductToWishlist(productId).subscribe({
          next: res => {
            this.wishListService.wishListIds.set(res.data)
            this.favoriteloading.set(false)
          },
          error: err => {
            this.favoriteloading.set(false)
          }
        })
      }

    }
  }


}
