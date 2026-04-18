import { Component, inject, input, OnInit, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReviewsService } from '../../reviews.service';
import { ToastrService } from 'ngx-toastr';
import { MystorageService } from '../../../../../../../../core/services/mystorage.service';
import { CommunicationService } from '../../../../../../../../core/services/communication.service';

@Component({
  selector: 'app-write-review',
  imports: [FormsModule],
  templateUrl: './write-review.component.html',
  styleUrl: './write-review.component.css',
})
export class WriteReviewComponent implements OnInit {
  private readonly reviewsService = inject(ReviewsService)
  private readonly toastrService = inject(ToastrService)
  private readonly mystorageService = inject(MystorageService)
  private readonly communicationService = inject(CommunicationService)
  iswriteReview = output<boolean>()
  productId = input.required<string>()
  review = input<Ireview>()
  rating = signal<number>(0)
  user = signal<Iuser>({} as Iuser)
  loading = signal<boolean>(false)
  reviewText = signal<string>('')

  ngOnInit(): void {
    if (this.mystorageService.getUserObject()) {
      this.user.set(JSON.parse(this.mystorageService.getUserObject()!))
    }
    if (this.review()) {
      this.rating.set(this.review()?.rating!)
      this.reviewText.set(this.review()?.review!)
    }
  }
  submitReview() {


    if (this.reviewText().length === 0 || this.rating() === 0 || this.loading()) return

    if (this.review()) {
      this.updateReview()
    }else{
    this.createReview()
    }
  }

  cancel() {
    if (this.loading()) return
    this.iswriteReview.emit(false)
  }
  createReview() {
    this.loading.set(true)

    this.reviewsService.createReview(this.productId(), this.rating(), this.reviewText()).subscribe({
      next: res => {
        this.toastrService.success('Your review submitted sucessfully')
        this.loading.set(false)
        this.rating.set(0)
        this.reviewText.set('')
        this.communicationService.reCallGetSpecificProductData()
      },
      error: err => {
        this.loading.set(false)

      }
    })
  }
  updateReview() {
    this.loading.set(true)

    this.reviewsService.updateReview(this.review()?._id!, this.rating(), this.reviewText()).subscribe({
      next: res => {
        this.toastrService.success('Your review Updated sucessfully')
        this.loading.set(false)
        this.iswriteReview.emit(false)
        this.communicationService.reCallGetSpecificProductData()
      },
      error: err => {
        this.loading.set(false)

      }
    })
  }
}
