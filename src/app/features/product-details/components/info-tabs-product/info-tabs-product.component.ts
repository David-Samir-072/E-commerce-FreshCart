import { Component, input, signal } from '@angular/core';
import { ProductDetailsTabComponent } from "./components/product-details-tab/product-details-tab.component";
import { ReviewsTabComponent } from "./components/reviews-tab/reviews-tab.component";
import { ShippingTabComponent } from "./components/shipping-tab/shipping-tab.component";

@Component({
  selector: 'app-info-tabs-product',
  imports: [ProductDetailsTabComponent, ReviewsTabComponent, ShippingTabComponent],
  templateUrl: './info-tabs-product.component.html',
  styleUrl: './info-tabs-product.component.css',
})
export class InfoTabsProductComponent {
  tab = signal<number>(1);
  detailedProduct = input.required<IdetailedProduct>();

}
