import { Component, inject, input, OnInit, signal } from '@angular/core';
import { RouterLink } from "@angular/router";
import { ReviewItemComponent } from "./review-item/review-item.component";
import { MystorageService } from '../../../../../../../core/services/mystorage.service';
import { WriteReviewComponent } from "./write-review/write-review.component";

@Component({
  selector: 'app-manage-reviews',
  imports: [RouterLink, ReviewItemComponent, WriteReviewComponent],
  templateUrl: './manage-reviews.component.html',
  styleUrl: './manage-reviews.component.css',
})
export class ManageReviewsComponent implements OnInit {
  private readonly mystorageService = inject(MystorageService)
  detailedProduct = input.required<IdetailedProduct>()
  sortedReviews = signal<Ireview[]>([])
  showMore = signal<boolean>(false)
  isLogged = signal<boolean>(false)
  hasReview = signal<boolean>(false)
  iswriteReview = signal<boolean>(false)
  ngOnInit(): void {
    const logged = this.mystorageService.getToken();
    this.isLogged.set(logged ? true : false)

    const userId = this.mystorageService.getUserId()
    if (this.detailedProduct().reviews.find((rev) => rev.user._id === userId)) {
      this.hasReview.set(true)
    }
    const revs = this.detailedProduct().reviews.sort((a, b) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    this.sortedReviews.set(revs)


  }
}
