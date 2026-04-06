import { AfterViewInit, Component } from '@angular/core';
import * as AOS from 'aos';
@Component({
  selector: 'app-discount',
  imports: [],
  templateUrl: './discount.component.html',
  styleUrl: './discount.component.css',
})
export class DiscountComponent implements AfterViewInit {
  ngAfterViewInit() {
  AOS.init({
    duration: 800,
    once: true
  });
}
}
