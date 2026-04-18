import { Component, inject, signal } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from "@angular/router";
import { AuthService } from '../../core/auth/services/auth.service';
import { CartInLocalStorageService } from '../../core/services/cart-in-local-storage.service';
import { CartService } from '../../core/services/cart.service';
import { WishListService } from '../../core/services/wish-list.service';
import { GuestWishListService } from '../../core/services/guest-wish-list.service';
import { ToastrService } from 'ngx-toastr';
import { jwtDecode } from "jwt-decode";

@Component({
  selector: 'app-login',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  isShowPassword = signal<string>('password');

  acountErrorMessage = signal<string>('');

  loading = signal<boolean>(false);

  showErrors = signal<boolean>(false);

  private readonly cartService = inject(CartService);
  private readonly toastrService = inject(ToastrService);
  private readonly cartInLocalStorageService = inject(CartInLocalStorageService);
  private readonly wishListService = inject(WishListService);
  private readonly guestWishListService = inject(GuestWishListService);
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  keepMeSignedCheck: FormControl = this.fb.control(false)
  LoginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)]],
  })



  submitForm(): void {
    if (this.LoginForm.invalid) {
      this.showErrors.set(true);
      return
    }

    this.sendSignInData();

  }

  sendSignInData(): void {
    this.loading.set(true)


    this.authService.signIn(this.LoginForm.value).subscribe({
      next: res => {
        if (res.message === 'success') {
          this.loading.set(false);
          const decoded = jwtDecode<any>(res.token)
          if (this.keepMeSignedCheck.value) {
            localStorage.setItem('freshToken', res.token);
            localStorage.setItem('freshUser', JSON.stringify(res.user));
            localStorage.setItem('userId', decoded.id);
          } else {
            sessionStorage.setItem('freshToken', res.token)
            sessionStorage.setItem('freshUser', JSON.stringify(res.user))
            sessionStorage.setItem('userId', decoded.id);

          }
          this.authService.isLogged.set(true)
          this.authService.user.set(res.user)

          this.router.navigate(['/'])

        }
      },
      error: err => {
        if (err.error.message === 'Incorrect email or password') {

          this.acountErrorMessage.set(err.error.message);
        }
        this.loading.set(false)
      },
      complete: () => {
        this.sendGuestCartToBE()
        this.sendGuestWishListToBE()
      }

    })
  }

  // after login send all data of guest cart to backend 
  sendGuestCartToBE() {
    if (this.cartInLocalStorageService.cartList().length === 0) return

    this.cartInLocalStorageService.cartList().forEach((item) => {
      this.addToCart(item.product.id, item.count)
    })
  }

  sendGuestWishListToBE() {
    if (this.guestWishListService.wishList().length === 0) return

    this.guestWishListService.wishList().forEach((item) => {
      this.addtoWishList(item.id);
    })
  }
  addtoWishList(productId: string) {
    const lastItemId = this.guestWishListService.wishList().at(-1)?._id
    this.wishListService.addProductToWishlist(productId).subscribe({
      next: res => {
        if (lastItemId === productId) {
          this.wishListService.wishListIds.set(res.data)
          this.toastrService.success(`Guest wishList saved in user WishList`)
          this.guestWishListService.wishList.set([])
        }
      }
    })
  }

  addToCart(productID: string, count: number) {
    const lastItemId = this.cartInLocalStorageService.cartList().at(-1)?.product._id
    this.cartService.addProductToCart(productID).subscribe({
      next: res => {

        if (lastItemId === productID) {
          this.cartService.numOfCartItems.set(res.numOfCartItems)
          this.toastrService.success(`Guest Cart saved in user Cart`)

        }

      },
      complete: () => {
        if (count > 1) {
          this.UpdateItemQuantity(productID, count)
        }

        if (lastItemId === productID)
          this.cartInLocalStorageService.ClearCart()


      }
    })
  }


  UpdateItemQuantity(productId: string, count: number) {
    this.cartService.UpdateCartProductQuantity(productId, count).subscribe();
  }
}
