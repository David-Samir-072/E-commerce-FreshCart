import { Component } from '@angular/core';
import { ShippingFeaturesComponent } from "../shipping-features/shipping-features.component";

@Component({
  selector: 'app-footer',
  imports: [ShippingFeaturesComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class FooterComponent {}
