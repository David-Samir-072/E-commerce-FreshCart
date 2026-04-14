import { CommonModule, DatePipe } from '@angular/common';
import { Component, input, signal } from '@angular/core';
import { TotalCartItemsPipe } from '../../../../shared/pipes/total-cart-items-pipe';

@Component({
  selector: 'app-order-item',
  imports: [DatePipe,TotalCartItemsPipe,CommonModule],
  templateUrl: './order-item.component.html',
  styleUrl: './order-item.component.css',
})
export class OrderItemComponent {
  order=input.required<IOrder>()
  showMore = signal<boolean>(false)

}
