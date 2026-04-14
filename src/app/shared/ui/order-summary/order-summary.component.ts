import { Component, computed, inject, input, signal } from '@angular/core';
import { AuthService } from '../../../core/auth/services/auth.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-order-summary',
  imports: [RouterLink],
  templateUrl: './order-summary.component.html',
  styleUrl: './order-summary.component.css',
})
export class OrderSummaryComponent {
    cartDetails=input.required<IcartProduct[]>()
    totalPrice=input.required<number>()
    cartId=input.required<string>()
    isCheckout=input<boolean>()
    private readonly authService=inject(AuthService)
    isLogged=computed(()=>this.authService.isLogged())
    shippingFree=signal<number>(450)
}
