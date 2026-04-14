import { Component, inject, PLATFORM_ID, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { ProductsService } from '../../core/services/products.service';
import { ItemProductComponent } from "../../shared/ui/item-product/item-product.component";
import { NgxPaginationModule } from 'ngx-pagination';
import { LoadingPageComponent } from "../../shared/ui/loading-page/loading-page.component";
import { isPlatformBrowser } from '@angular/common';
import { EmptyProductsComponent } from "./empty-products/empty-products.component";
import { BrandService } from '../brands/brand.service';
import { CategoriesService } from '../../core/services/categories.service';
@Component({
  selector: 'app-shop',
  imports: [RouterLink, ItemProductComponent, NgxPaginationModule, LoadingPageComponent, EmptyProductsComponent],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css',
})
export class ShopComponent {
  private readonly productsService = inject(ProductsService);
  private readonly brandService = inject(BrandService);
  private readonly categoriesService = inject(CategoriesService);
  private readonly pLATFORM_ID = inject(PLATFORM_ID);
  productsList = signal<Iproduct[]>([]);
  pageSize = signal<number>(0);
  cp = signal<number>(0);
  total = signal<number>(0);
  loadingPage = signal<boolean>(false);
  brand = signal<string | null>('');
  category = signal<string | null>('');
  subcategory = signal<string | null>('');
  filterInfo = signal<IfilterInfo>({} as IfilterInfo);
  private readonly activatedRoute = inject(ActivatedRoute)
  private readonly router = inject(Router)

  ngOnInit(): void {
    this.activatedRoute.queryParamMap.subscribe(
      (queryparams) => {
        this.category.set(queryparams.get('category'))
        this.subcategory.set(queryparams.get('subcategory'))
        this.brand.set(queryparams.get('brand'))
        const page = queryparams.get('page')

        if (this.category()) {
          this.getCategoryProductsData(this.category()!, page ?? 1)
          this.getSpecificCategoryData(this.category()!)
        } else if (this.subcategory()) {
          this.getsubCategoryProductsData(this.subcategory()!, page ?? 1)
          this.getSpecificSubcategoryData(this.subcategory()!)
        } else if (this.brand()) {
          this.getBrandProductsData(this.brand()!, page ?? 1)
          this.getSpecificBrandData(this.brand()!)
        } else {
          this.getAllProductsData(page ?? 1)
        }
      }
    )
  }


  changePage(pageNumber: number) {
    this.scrollToTop()
    if (this.category()) {
      this.router.navigate(['/shop'], { queryParams: { category: this.category(), page: pageNumber } })
    } else if (this.subcategory()) {
      this.router.navigate(['/shop'], { queryParams: { subcategory: this.subcategory(), page: pageNumber } })
    } else if (this.brand()) {
      this.router.navigate(['/shop'], { queryParams: { brand: this.brand(), page: pageNumber } })
    } else {
      this.router.navigate(['/shop'], { queryParams: { page: pageNumber } })
    }
  }

  getAllProductsData(pageNumber: number | string) {
    this.loadingPage.set(true);

    this.productsService.getAllProducts(+pageNumber).subscribe({
      next: res => {
        this.productsList.set(res.data)
        this.pageSize.set(res.metadata.limit)
        this.cp.set(res.metadata.currentPage)
        this.total.set(res.results)
        this.loadingPage.set(false);
      },
      error: err => {
        this.loadingPage.set(false);

      }
    }

    )
  }


  getCategoryProductsData(categoryId: string, pageNumber: number | string) {
    this.loadingPage.set(true);
    this.productsService.getCategoryProducts(categoryId, +pageNumber).subscribe({
      next: res => {
        this.productsList.set(res.data)
        this.pageSize.set(res.metadata.limit)
        this.cp.set(res.metadata.currentPage)
        this.total.set(res.results)
        this.loadingPage.set(false);
      },
      error: err => {
        this.loadingPage.set(false);
      }
    }

    )
  }
  getSpecificCategoryData(categoryId: string) {
    this.categoriesService.getSpecificCategory(categoryId).subscribe({
      next: res => {
          this.filterInfo.set(res.data)
      }
    }
    )
  }
  



  getsubCategoryProductsData(subcategoryId: string, pageNumber: number | string) {
    this.loadingPage.set(true);
    this.productsService.getsubCategoryProducts(subcategoryId, +pageNumber).subscribe({
      next: res => {
        this.productsList.set(res.data)

        this.pageSize.set(res.metadata.limit)
        this.cp.set(res.metadata.currentPage)
        this.total.set(res.results)
        this.loadingPage.set(false);
      },
      error: err => {
        this.loadingPage.set(false);
      }
    }

    )
  }


  getSpecificSubcategoryData(subcategoryId: string) {
    this.categoriesService.getSpecificSubcategory(subcategoryId).subscribe({
      next: res => {
          this.filterInfo.set(res.data)
      }
    }
    )
  }


   getBrandProductsData(brandId: string, pageNumber: number | string) {
    this.loadingPage.set(true);
    this.productsService.getBrandProducts(brandId, +pageNumber).subscribe({
      next: res => {
        this.productsList.set(res.data)
        this.pageSize.set(res.metadata.limit)
        this.cp.set(res.metadata.currentPage)
        this.total.set(res.results)
        this.loadingPage.set(false);
      },
      error: err => {
        this.loadingPage.set(false);

      }
    }
    )
  }


    getSpecificBrandData(brandId: string) {
    this.brandService.getSpecificBrand(brandId).subscribe({
      next: res => {
          this.filterInfo.set(res.data)
      }
    }
    )
  }




  scrollToTop() {
    if (isPlatformBrowser(this.pLATFORM_ID)) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  }
}
