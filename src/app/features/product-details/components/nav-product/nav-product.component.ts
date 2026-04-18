import { Component, input } from '@angular/core';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-nav-product',
  imports: [RouterLink],
  templateUrl: './nav-product.component.html',
  styleUrl: './nav-product.component.css',
})
export class NavProductComponent {
  product=input.required<IdetailedProduct>();

}
