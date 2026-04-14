import { Component, inject, signal } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from "@angular/router";
import { AuthService } from '../../core/auth/services/auth.service';
import { CartInLocalStorageService } from '../../core/services/cart-in-local-storage.service';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-login',
  imports: [RouterLink,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  isShowPassword=signal<string>('password');

   acountErrorMessage=signal<string>('');

  loading=signal<boolean>(false);

  showErrors = signal<boolean>(false);

  private readonly cartService = inject(CartService);
  private readonly cartInLocalStorageService = inject(CartInLocalStorageService);
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

  sendSignInData():void{
    this.loading.set(true)
    
    
    this.authService.signIn(this.LoginForm.value).subscribe({
      next:res=>{
        if (res.message==='success') {
          this.loading.set(false);
          if (this.keepMeSignedCheck.value) {
            localStorage.setItem('freshToken',res.token);
            localStorage.setItem('freshUser',JSON.stringify(res.user));
          }else{
            sessionStorage.setItem('freshToken',res.token)
            sessionStorage.setItem('freshUser',JSON.stringify(res.user))
          }
          this.authService.isLogged.set(true)

          this.router.navigate(['/'])

        }
      },
      error:err=>{
        this.acountErrorMessage.set(err.error.message);
        this.loading.set(false)
      },
      complete:()=>{
       this.sendGuestCartToBE()
      }
      
    })
  }

  // after login send all data of guest cart to backend 
  sendGuestCartToBE(){ 
    if (this.cartInLocalStorageService.cartList().length===0) return

     this.cartInLocalStorageService.cartList().forEach((item)=>{
      this.addToCart(item.product.id,item.count)
     }) 
  }

    addToCart(productID: string, count: number) {
      const lastItemId=this.cartInLocalStorageService.cartList().at(-1)?.product._id
      this.cartService.addProductToCart(productID).subscribe({
        next: res => {
          
          if (lastItemId===productID) {
          this.cartService.numOfCartItems.set(res.numOfCartItems)
        }

        },
        complete: () => {
          if (count > 1) {
            this.UpdateItemQuantity(productID, count)
          }

           if (lastItemId===productID) 
            this.cartInLocalStorageService.ClearCart()


        }
      })
  }


    UpdateItemQuantity(productId: string, count: number) {
    this.cartService.UpdateCartProductQuantity(productId, count).subscribe();
}
}
