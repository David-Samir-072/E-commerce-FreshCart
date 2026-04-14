import { Component, computed, inject, input, signal } from '@angular/core';
import { AuthService } from '../../../../core/auth/services/auth.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart-right-side',
  imports: [RouterLink],
  templateUrl: './cart-right-side.component.html',
  styleUrl: './cart-right-side.component.css',
})
export class CartRightSideComponent {
  cartDetails=input.required<IcartProduct[]>()
totalPrice=input.required<number>()
  private readonly authService=inject(AuthService)
  isLogged=computed(()=>this.authService.isLogged())
  shippingFree=signal<number>(450)
}
