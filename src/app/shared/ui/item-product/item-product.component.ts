import { Component, input } from '@angular/core';
import { DiscountCalcPipe } from '../../pipes/discount-calc-pipe';
import { RouterLink } from "@angular/router";
import { StarsProductComponent } from "../stars-product/stars-product.component";

@Component({
  selector: 'app-item-product',
  imports: [DiscountCalcPipe, RouterLink, StarsProductComponent],
  templateUrl: './item-product.component.html',
  styleUrl: './item-product.component.css',
})
export class ItemProductComponent {
  product=input.required<Iproduct>();
}
