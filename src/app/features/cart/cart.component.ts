import { Component, computed, inject, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { EmptyCartComponent } from "./components/empty-cart/empty-cart.component";
import { RouterLink } from "@angular/router";
import { CartService } from '../../core/services/cart.service';
import { MystorageService } from '../../core/services/mystorage.service';
import { CartItemComponent } from "./components/cart-item/cart-item.component";
import { LoadingPageComponent } from "../../shared/ui/loading-page/loading-page.component";
import { AuthService } from '../../core/auth/services/auth.service';
import { CartRightSideComponent } from "./components/cart-right-side/cart-right-side.component";
import { CartInLocalStorageService } from '../../core/services/cart-in-local-storage.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-cart',
  imports: [EmptyCartComponent, RouterLink, CartItemComponent, LoadingPageComponent, CartRightSideComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {
  cartDetails = signal<IcartProduct[]>([])
  loading = signal<boolean>(true);
  totalPrice = signal<number>(0);
  private readonly cartService = inject(CartService)
  private readonly mystorageService = inject(MystorageService)
  private readonly authService = inject(AuthService)
  private readonly pLATFORM_ID = inject(PLATFORM_ID)
  private readonly cartInLocalStorageService = inject(CartInLocalStorageService)
  isLogged = computed(() => this.authService.isLogged())

  ngOnInit(): void {
    if (isPlatformBrowser(this.pLATFORM_ID)) {
      this.getCartData()
    }
  }

  getCartData() {
    if (this.isLogged()) {
      this.loading.set(true)
      this.cartService.getLoggedUserCart().subscribe({
        next: res => {
          this.cartDetails.set(res.data.products)
          this.totalPrice.set(res.data.totalCartPrice)

          if ( this.cartDetails().length) {
            this.mystorageService.set('cartOwner', res.data.cartOwner)
          }
          this.loading.set(false)
        },
        error: err => {
          this.loading.set(false)
        }
      })
    } else {
      this.getCartFromLocalStorage()
      this.loading.set(false)
    }
  }


  clearCartData() {
    if (this.isLogged()) {
      this.loading.set(true)
      this.cartService.ClearUserCart().subscribe({
        next: res => {
          this.cartDetails.set(res.data.products)
          this.totalPrice.set(res.data.totalCartPrice)
          this.cartService.numOfCartItems.set(res.numOfCartItems)
          this.loading.set(false)
        },
        error: err => {
          this.loading.set(false)
        }

      })
    } else {
      this.cartInLocalStorageService.ClearCart()
      this.getCartFromLocalStorage()
    }
  }


  getCartFromLocalStorage() {

    this.cartDetails.set(this.cartInLocalStorageService.cartList())
    this.totalPrice.set(this.cartInLocalStorageService.calculateTotalPrice())
  }
}