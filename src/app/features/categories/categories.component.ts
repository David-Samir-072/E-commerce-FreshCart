import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { LoadingPageComponent } from "../../shared/ui/loading-page/loading-page.component";
import { CategoryItemComponent } from './category-item/category-item.component';
import { SubcategoryItemComponent } from "./subcategory-item/subcategory-item.component";
import { CategoriesService } from '../../core/services/categories.service';
@Component({
  selector: 'app-categories',
  imports: [LoadingPageComponent, CategoryItemComponent, SubcategoryItemComponent, RouterLink],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css',
})
export class CategoriesComponent {
  categoriesList = signal<Icategory[]>([])
  id = signal<string | null>('');
  loadingPage = signal<boolean>(false)
  categoryInfo = signal<Icategory>({} as Icategory);

  private readonly categoriesService = inject(CategoriesService)
  private readonly activatedRoute = inject(ActivatedRoute)

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.id.set(params.get('id'));
      if (this.id()) {
        this.getSpecificCategoryData(this.id()!)
        this.getAllSubcategoriesOnCategoryData(this.id()!)
      } else {
        this.getAllCategoriesData()
      }

    });
  }


  getAllSubcategoriesOnCategoryData(categoryId: string) {
    this.loadingPage.set(true)
    this.categoriesService.getAllSubcategoriesOnCategory(categoryId).subscribe({
      next: res => {
        this.categoriesList.set(res.data)
        this.loadingPage.set(false)
      },
      error: err => {
        this.loadingPage.set(false)
      }
    })
  }

    getSpecificCategoryData(categoryId: string) {
    this.categoriesService.getSpecificCategory(categoryId).subscribe({
      next: res => {
          this.categoryInfo.set(res.data)
      }
    }
    )
  }

  getAllCategoriesData() {
    this.loadingPage.set(true)
    this.categoriesService.getAllCategories().subscribe({
      next: res => {
        this.categoriesList.set(res.data)
        this.loadingPage.set(false)
      },
      error: err => {
        this.loadingPage.set(false)
      }
    })
  }

}
