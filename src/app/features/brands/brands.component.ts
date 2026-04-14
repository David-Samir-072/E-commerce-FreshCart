import { Component, inject, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { BrandService } from './brand.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { isPlatformBrowser } from '@angular/common';
import { LoadingPageComponent } from "../../shared/ui/loading-page/loading-page.component";

@Component({
  selector: 'app-brands',
  imports: [RouterLink, NgxPaginationModule, LoadingPageComponent],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.css',
})
export class BrandsComponent implements OnInit {
  brandsList = signal<Ibrand[]>([])
  pageSize = signal<number>(0);
  cp = signal<number>(0);
  total = signal<number>(0);
  loadingPage = signal<boolean>(false)
  private readonly pLATFORM_ID = inject(PLATFORM_ID);
  private readonly brandService = inject(BrandService)
  private readonly activatedRoute = inject(ActivatedRoute)
  private readonly router = inject(Router)

  ngOnInit(): void {
    this.activatedRoute.queryParamMap.subscribe(
      (queryparams) => {
        this.getAllBrandsData(queryparams.get('page') ?? 1)
      }
    )
  }


  changePage(pageNumber:number){
    this.scrollToTop()
    this.router.navigate(['/brands'],{queryParams:{page:pageNumber}})
  }

  getAllBrandsData(pageNumber:number|string) {
    this.loadingPage.set(true)
    this.brandService.getAllBrands(+pageNumber).subscribe({
      next: res => {
        this.brandsList.set(res.data)
        this.pageSize.set(res.metadata.limit)
        this.cp.set(res.metadata.currentPage)
        this.total.set(res.results)
        this.loadingPage.set(false)
      },
      error: err => {
        this.loadingPage.set(false)
      }
    })
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
