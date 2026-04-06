import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../core/services/products.service';
import { NavProductComponent } from "./components/nav-product/nav-product.component";
import { InfoProductComponent } from "./components/info-product/info-product.component";

@Component({
  selector: 'app-product-details',
  imports: [NavProductComponent, InfoProductComponent],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
})
export class ProductDetailsComponent implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute)
  private readonly productsService = inject(ProductsService)
  product=signal<Iproduct>({} as Iproduct)

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(
      (params) => {
        this.getSpecificProductData(params.get('id')!)
      }
    )
  }

  getSpecificProductData(productId: string): void {
    this.productsService.getSpecificProduct(productId).subscribe({
      next: res => {
        console.log(res);
        this.product.set(res.data)
      }
    })

  }


}
