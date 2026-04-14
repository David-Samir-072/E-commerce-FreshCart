import { isPlatformBrowser } from '@angular/common';
import { AfterViewInit, Component, inject, PLATFORM_ID } from '@angular/core';
import * as AOS from 'aos';
import { RouterLink } from "@angular/router";
@Component({
  selector: 'app-discount',
  imports: [RouterLink],
  templateUrl: './discount.component.html',
  styleUrl: './discount.component.css',
})
export class DiscountComponent implements AfterViewInit {
  private platformId = inject(PLATFORM_ID);
  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      AOS.init({
        duration: 800,
        once: true
      });
    }
  }






}
