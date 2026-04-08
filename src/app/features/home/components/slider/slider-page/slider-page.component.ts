import { Component, input } from '@angular/core';

@Component({
  selector: 'app-slider-page',
  imports: [],
  templateUrl: './slider-page.component.html',
  styleUrl: './slider-page.component.css',
})
export class SliderPageComponent {
  title=input.required<string>();
  p=input.required<string>();
  btn1=input.required<string>();
  btn2=input.required<string>();
  btn1Color=input.required<string>();

}
