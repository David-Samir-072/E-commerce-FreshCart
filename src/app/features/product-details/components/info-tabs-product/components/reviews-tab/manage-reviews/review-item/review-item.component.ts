import { Component, inject, input, OnInit, signal } from '@angular/core';
import { CustomTimeAgoPipe } from '../../../../../../../../shared/pipes/custom-time-ago-pipe';
import { MystorageService } from '../../../../../../../../core/services/mystorage.service';
import { ReviewsService } from '../../reviews.service';
import { ToastrService } from 'ngx-toastr';
import { WriteReviewComponent } from "../write-review/write-review.component";
import { CommunicationService } from '../../../../../../../../core/services/communication.service';

@Component({
  selector: 'app-review-item',
  imports: [CustomTimeAgoPipe, WriteReviewComponent],
  templateUrl: './review-item.component.html',
  styleUrl: './review-item.component.css',
})
export class ReviewItemComponent implements OnInit {
  review = input.required<Ireview>()
  isUserReview = signal<boolean>(false)
  loadingdelete = signal<boolean>(false)
  edit = signal<boolean>(false)
  private readonly mystorageService = inject(MystorageService)
  private readonly reviewsService = inject(ReviewsService)
  private readonly toastrService = inject(ToastrService)
  private readonly communicationService = inject(CommunicationService)

  ngOnInit(): void {
    if (this.mystorageService.get('cartOwner')) {
      const userId = this.mystorageService.get('cartOwner')
      if (userId === this.review().user._id) {
        this.isUserReview.set(true)
      }
    }
  }

  deleteReview() {
    if (this.loadingdelete()) return
    this.loadingdelete.set(true)
    this.reviewsService.deleteReview(this.review()._id).subscribe({
      next: res => {
        this.toastrService.success('Review Deleted')
        this.loadingdelete.set(false)
        this.communicationService.reCallGetSpecificProductData()
      },
      error: err => {
        this.loadingdelete.set(false)

      }
    })
  }

}
