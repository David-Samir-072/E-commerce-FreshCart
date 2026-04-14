import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../core/services/products.service';
import { NavProductComponent } from "./components/nav-product/nav-product.component";
import { InfoProductComponent } from "./components/info-product/info-product.component";
import { LoadingProductDetailsComponent } from "./components/loading-product-details/loading-product-details.component";

@Component({
  selector: 'app-product-details',
  imports: [NavProductComponent, InfoProductComponent, LoadingProductDetailsComponent],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
})
export class ProductDetailsComponent implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute)
  private readonly productsService = inject(ProductsService)
  product=signal<Iproduct>({} as Iproduct)
  loading=signal<boolean>(true)

  ngOnInit(): void {
    this.loading.set(true);
    this.activatedRoute.paramMap.subscribe(
      (params) => {
        this.getSpecificProductData(params.get('id')!)
      }
    )
  }

  getSpecificProductData(productId: string): void {
    this.productsService.getSpecificProduct(productId).subscribe({
      next: res => {
        this.product.set(res.data);
        this.loading.set(false);
      }
    })

  }


}
