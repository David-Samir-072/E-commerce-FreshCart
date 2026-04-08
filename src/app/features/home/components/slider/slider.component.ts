import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SliderPageComponent } from "./slider-page/slider-page.component";

@Component({
  selector: 'app-slider',
  imports: [SliderPageComponent],
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.css',
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class SliderComponent {}
