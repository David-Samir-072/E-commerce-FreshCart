import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-empty-products',
  imports: [RouterLink],
  templateUrl: './empty-products.component.html',
  styleUrl: './empty-products.component.css',
})
export class EmptyProductsComponent {}
