import { Component, computed, inject, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { RouterLink } from "@angular/router";
import { WishListService } from '../../core/services/wish-list.service';
import { isPlatformBrowser } from '@angular/common';
import { CartService } from '../../core/services/cart.service';
import { AuthService } from '../../core/auth/services/auth.service';
import { CartInLocalStorageService } from '../../core/services/cart-in-local-storage.service';
import { FavorateItemComponent } from "./components/favorate-item/favorate-item.component";
import { LoadingPageComponent } from "../../shared/ui/loading-page/loading-page.component";
import { EmptyWishListComponent } from "./components/empty-wish-list/empty-wish-list.component";
import { GuestWishListService } from '../../core/services/guest-wish-list.service';

@Component({
  selector: 'app-wishlist',
  imports: [RouterLink, FavorateItemComponent, LoadingPageComponent, EmptyWishListComponent],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css',
})
export class WishlistComponent implements OnInit {
  wishList = signal<Iproduct[]>([])
  private readonly cartInLocalStorageService = inject(CartInLocalStorageService)
  private readonly authService = inject(AuthService)
  private readonly cartService = inject(CartService)
  private readonly wishListService = inject(WishListService)
  private readonly guestWishListService = inject(GuestWishListService)
  private readonly pLATFORM_ID = inject(PLATFORM_ID)
  cartDetails = signal<IcartProduct[]>([])
  isLogged = computed(() => this.authService.isLogged())

  loadingPage1 = signal<boolean>(false);
  loadingPage2 = signal<boolean>(false);

  ngOnInit(): void {
    if (isPlatformBrowser(this.pLATFORM_ID)) {
      this.loadingPage1.set(true)
      this.getLoggedUserWishlistData();
      this.getCartData()
    }
  }


  getLoggedUserWishlistData() {
    if (this.isLogged()) {
      this.wishListService.getLoggedUserWishlist().subscribe({
        next: res => {
          this.wishList.set(res.data)
          this.loadingPage1.set(false)
        },
        error: err => {
          this.loadingPage1.set(false)
        }
      })

    } else {
      this.loadingPage1.set(false)
      this.wishList.set(this.guestWishListService.wishList())
    }

  }


  getCartData() {
    if (this.isLogged()) {
      this.loadingPage2.set(true)
      this.cartService.getLoggedUserCart().subscribe({
        next: res => {
          this.cartDetails.set(res.data.products)
          this.loadingPage2.set(false)
        },
        error: err => {
          this.loadingPage2.set(false)
        }
      })
    } else {
      this.cartDetails.set(this.cartInLocalStorageService.cartList())
    }
  }

  isInCart(productId: string): boolean {
    return !!this.cartDetails().find((item) =>
      item.product._id === productId
    )
  }
}
