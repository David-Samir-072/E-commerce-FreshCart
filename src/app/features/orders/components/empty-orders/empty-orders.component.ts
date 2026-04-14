import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-empty-orders',
  imports: [RouterLink],
  templateUrl: './empty-orders.component.html',
  styleUrl: './empty-orders.component.css',
})
export class EmptyOrdersComponent {}
