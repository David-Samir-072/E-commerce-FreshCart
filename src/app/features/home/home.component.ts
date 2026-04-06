import { Component } from '@angular/core';
import { SliderComponent } from "./components/slider/slider.component";
import { ShippingFeaturesHomeComponent } from "./components/shipping-features-home/shipping-features-home.component";
import { CategoriesHomeComponent } from "./components/categories-home/categories-home.component";
import { DiscountComponent } from "./components/discount/discount.component";
import { ProductsHomeComponent } from "./components/products-home/products-home.component";
import { SubtitleHomeComponent } from "./components/subtitle-home/subtitle-home.component";
import { SubscribeComponent } from "./components/subscribe/subscribe.component";

@Component({
  selector: 'app-home',
  imports: [SliderComponent, ShippingFeaturesHomeComponent, CategoriesHomeComponent, DiscountComponent, ProductsHomeComponent, SubtitleHomeComponent, SubscribeComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}
