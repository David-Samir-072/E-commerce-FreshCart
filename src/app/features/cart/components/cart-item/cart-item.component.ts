import { Component, computed, inject, input, output, signal } from '@angular/core';
import { RouterLink } from "@angular/router";
import { AuthService } from '../../../../core/auth/services/auth.service';
import { CartService } from '../../../../core/services/cart.service';
import { CartInLocalStorageService } from '../../../../core/services/cart-in-local-storage.service';

@Component({
  selector: 'app-cart-item',
  imports: [RouterLink],
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.css',
})
export class CartItemComponent {
  loadingRemove = signal<boolean>(false);
  loadingIncreaseQuantity = signal<boolean>(false);
  loadingDecreaseQuantity = signal<boolean>(false);

  disableBtnsflag = computed(() => this.loadingRemove() || this.loadingIncreaseQuantity() || this.loadingDecreaseQuantity())
  totalPrice = output<number>();
  item = input.required<IcartProduct>();
  updateCartDetails = output<IcartProduct[]>()
  private readonly authService = inject(AuthService)
  private readonly cartService = inject(CartService)
  private readonly cartInLocalStorageService = inject(CartInLocalStorageService)
  isLogged = computed(() => this.authService.isLogged())



  removeItem(productId: string) {
    if (this.disableBtnsflag()) return

    if (this.authService.isLogged()) {
      this.loadingRemove.set(true)
      this.cartService.RemoveProductFromCart(productId).subscribe({
        next: res => {
          this.updateCartDetails.emit(res.data.products)
          this.totalPrice.emit(res.data.totalCartPrice)
          this.cartService.numOfCartItems.set(res.numOfCartItems)
          this.loadingRemove.set(false)

        },
        error: err => {
          this.loadingRemove.set(false)
        }
      })
    } else {
      this.cartInLocalStorageService.removeFromCart(productId);
      this.emitLocals()
    }



  }

  UpdateItemQuantity(productId: string, quantityToBeAdded: number) {
    const count: number = quantityToBeAdded + this.item().count

    if (this.disableBtnsflag()) return
    if (count < 1) return
    if (count > this.item().product.quantity) return

    if (this.authService.isLogged()) {
      quantityToBeAdded >= 1 ? this.loadingIncreaseQuantity.set(true) : this.loadingDecreaseQuantity.set(true)
      this.cartService.UpdateCartProductQuantity(productId, count).subscribe({
        next: res => {
          this.updateCartDetails.emit(res.data.products)
          this.totalPrice.emit(res.data.totalCartPrice)
          quantityToBeAdded >= 1 ? this.loadingIncreaseQuantity.set(false) : this.loadingDecreaseQuantity.set(false)

        },
        error: err => {
          quantityToBeAdded >= 1 ? this.loadingIncreaseQuantity.set(false) : this.loadingDecreaseQuantity.set(false)
        }
      })
    }else{
      this.cartInLocalStorageService.updateItemInCart(productId,count);
      this.emitLocals();
    }

  }


  emitLocals() {
    this.updateCartDetails.emit(this.cartInLocalStorageService.cartList())
    this.totalPrice.emit(this.cartInLocalStorageService.calculateTotalPrice())

  }

}
