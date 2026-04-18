import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, input, OnInit, signal } from '@angular/core';
import { ProductsService } from '../../../../core/services/products.service';
import { ItemProductComponent } from "../../../../shared/ui/item-product/item-product.component";

@Component({
  selector: 'app-similar-products',
  imports: [ItemProductComponent],
  templateUrl: './similar-products.component.html',
  styleUrl: './similar-products.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SimilarProductsComponent implements OnInit{
  private readonly productsService = inject(ProductsService)
  productsList=signal<Iproduct[]>([])
  categoryId=input.required<string>()

    ngOnInit(): void {
      this.getCategoryProductsData(this.categoryId())
    }
  getCategoryProductsData(categoryId: string) {
    this.productsService.getCategoryProducts(categoryId).subscribe({
      next: res => {
        this.productsList.set(res.data)
      }
    })
  }
}
