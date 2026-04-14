import { Component, input } from '@angular/core';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-subcategory-item',
  imports: [RouterLink],
  templateUrl: './subcategory-item.component.html',
  styleUrl: './subcategory-item.component.css',
})
export class SubcategoryItemComponent {
  subcategory=input.required<Icategory>()
}
