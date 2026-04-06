import { Component, OnInit } from '@angular/core';
import * as AOS from 'aos';
@Component({
  selector: 'app-discount',
  imports: [],
  templateUrl: './discount.component.html',
  styleUrl: './discount.component.css',
})
export class DiscountComponent implements OnInit{
  ngOnInit(): void {
    AOS.init();
  }
}
