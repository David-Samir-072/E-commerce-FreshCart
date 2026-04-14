import { Component, computed, inject, input, output, signal } from '@angular/core';
import { WishListService } from '../../../../core/services/wish-list.service';
import { RouterLink } from "@angular/router";
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../../core/auth/services/auth.service';
import { CartService } from '../../../../core/services/cart.service';
import { CartInLocalStorageService } from '../../../../core/services/cart-in-local-storage.service';

@Component({
  selector: 'app-favorate-item',
  imports: [RouterLink,CommonModule],
  templateUrl: './favorate-item.component.html',
  styleUrl: './favorate-item.component.css',
})
export class FavorateItemComponent {
  product = input.required<Iproduct>()
  isInCart = input.required<boolean>()
  isAddedToCart = signal<boolean>(false)
  getList = output<void>()

  favoriteloading = signal<boolean>(false);
  loadingAddedtoCart = signal<boolean>(false);
    private readonly authService = inject(AuthService)
    private readonly cartService = inject(CartService)
    private readonly cartInLocalStorageService = inject(CartInLocalStorageService)
  
  private readonly wishListService = inject(WishListService)
  isLogged = computed(() => this.authService.isLogged());


  removeFromFavorite() {

    if (this.isLogged()) {
    
    if (this.favoriteloading()) return

    this.favoriteloading.set(true)
    this.wishListService.removeProductFromWishlist(this.product()._id).subscribe({
      next: res => {
        this.wishListService.wishListIds.set(res.data)
        this.favoriteloading.set(false)
        this.getList.emit()
      },
      error: err => {
        this.favoriteloading.set(false)
      }
    })

  }
  }



    addToCart(product: Iproduct): void {

    if (this.isLogged()) {
      if (this.loadingAddedtoCart()) return
      this.loadingAddedtoCart.set(true);
      this.cartService.addProductToCart(product._id).subscribe({
        next: res => {
          this.loadingAddedtoCart.set(false);
          this.cartService.numOfCartItems.set(res.numOfCartItems)
          this.isAddedToCart.set(true)
        },
        error: err => {
          this.loadingAddedtoCart.set(false);
        }
      })

    } else {
      this.cartInLocalStorageService.addToCart(product)
    }

  }

}
