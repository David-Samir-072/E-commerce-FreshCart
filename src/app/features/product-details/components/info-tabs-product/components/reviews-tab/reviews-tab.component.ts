import { Component, input, OnInit, signal } from '@angular/core';
import { ManageReviewsComponent } from "./manage-reviews/manage-reviews.component";

@Component({
  selector: 'app-reviews-tab',
  imports: [ManageReviewsComponent],
  templateUrl: './reviews-tab.component.html',
  styleUrl: './reviews-tab.component.css',
})
export class ReviewsTabComponent implements OnInit {
  detailedProduct = input.required<IdetailedProduct>()
  star1 = signal<number>(0)
  star2 = signal<number>(0)
  star3 = signal<number>(0)
  star4 = signal<number>(0)
  star5 = signal<number>(0)
  ngOnInit(): void {
    
    if (this.detailedProduct().reviews.length) {
      
      let stars: number[] = [0, 0, 0, 0, 0, 0]
    this.detailedProduct().reviews.forEach((review) => {
      stars[review.rating]++;
    })

    this.star1.set(Math.round(stars[1] * 100 / this.detailedProduct().ratingsQuantity))
    this.star2.set(Math.round(stars[2] * 100 / this.detailedProduct().ratingsQuantity))
    this.star3.set(Math.round(stars[3] * 100 / this.detailedProduct().ratingsQuantity))
    this.star4.set(Math.round(stars[4] * 100 / this.detailedProduct().ratingsQuantity))
    this.star5.set(Math.round(stars[5] * 100 / this.detailedProduct().ratingsQuantity))
  }

    }
}
