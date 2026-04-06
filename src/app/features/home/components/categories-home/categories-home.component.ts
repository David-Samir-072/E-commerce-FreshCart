import { Component, inject, OnInit, signal } from '@angular/core';
import { CategoriesService } from '../../../../core/services/categories.service';
import { SubtitleHomeComponent } from "../subtitle-home/subtitle-home.component";
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-categories-home',
  imports: [SubtitleHomeComponent, RouterLink],
  templateUrl: './categories-home.component.html',
  styleUrl: './categories-home.component.css',
})
export class CategoriesHomeComponent implements OnInit {
  private readonly categoriesService=inject(CategoriesService)

  categoriesList=signal<Icategory[]>([])

  ngOnInit(): void {
    this.getAllCategoriesData();
  }

  getAllCategoriesData():void{
    this.categoriesService.getAllCategories().subscribe({
      next:res=>{
        console.log(res);
        this.categoriesList.set(res.data)
      }
    })
  }
}
