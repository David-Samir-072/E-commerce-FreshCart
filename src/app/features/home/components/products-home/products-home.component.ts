import { Component, inject, OnInit, signal } from '@angular/core';
import { SubtitleHomeComponent } from "../subtitle-home/subtitle-home.component";
import { ItemProductComponent } from "../../../../shared/ui/item-product/item-product.component";
import { ProductsService } from '../../../../core/services/products.service';

@Component({
  selector: 'app-products-home',
  imports: [SubtitleHomeComponent, ItemProductComponent],
  templateUrl: './products-home.component.html',
  styleUrl: './products-home.component.css',
})
export class ProductsHomeComponent implements OnInit {


  private readonly productsService = inject(ProductsService)

  productsList = signal<Iproduct[]>([]);

  ngOnInit(): void {
    this.getAllProductsData();
  }

  getAllProductsData() {
    this.productsService.getAllProducts().subscribe({
      next: res => {
        this.productsList.set(res.data)
      },
      error: err => {
      }
    }

    )
  }


}
