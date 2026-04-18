import { Component, inject, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { CartService } from '../../core/services/cart.service';
import { MystorageService } from '../../core/services/mystorage.service';
import { LoadingPageComponent } from "../../shared/ui/loading-page/loading-page.component";
import { RouterLink } from "@angular/router";
import { OrderItemComponent } from "./components/order-item/order-item.component";
import { EmptyOrdersComponent } from "./components/empty-orders/empty-orders.component";
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-orders',
  imports: [LoadingPageComponent, RouterLink, OrderItemComponent, EmptyOrdersComponent],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css',
})
export class OrdersComponent implements OnInit {
  private readonly cartService = inject(CartService)
  private readonly mystorageService = inject(MystorageService)
  private readonly pLATFORM_ID = inject(PLATFORM_ID)
  loadingPage = signal<boolean>(false)
  allOrders = signal<IOrder[]>([])


  ngOnInit(): void {
    if (isPlatformBrowser(this.pLATFORM_ID)) {
      this.getUserOrdersData();
      
    }
  }

  getUserOrdersData() {
    if (this.mystorageService.getToken()) {
      this.loadingPage.set(true)
      this.cartService.getUserOrders(this.mystorageService.getUserId()!).subscribe({
        next: res => {
          this.allOrders.set(res);
          this.loadingPage.set(false)
        },
        error: err => {
          this.loadingPage.set(false)

        }
      })

    }
  }


}
