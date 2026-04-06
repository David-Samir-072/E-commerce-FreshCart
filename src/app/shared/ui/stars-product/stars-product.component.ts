import { Component, input } from '@angular/core';

@Component({
  selector: 'app-stars-product',
  imports: [],
  templateUrl: './stars-product.component.html',
  styleUrl: './stars-product.component.css',
})
export class StarsProductComponent {
  ratingsAverage=input.required<number>()
  ratingsQuantity=input.required<number>()
  reviews=input.required<string>()
}
