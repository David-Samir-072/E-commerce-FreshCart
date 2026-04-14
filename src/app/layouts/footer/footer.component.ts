import { Component } from '@angular/core';
import { ShippingFeaturesComponent } from "../shipping-features/shipping-features.component";
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-footer',
  imports: [ShippingFeaturesComponent, RouterLink],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class FooterComponent {}
