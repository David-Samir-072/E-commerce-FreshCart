import { Component, input } from '@angular/core';

@Component({
  selector: 'app-loading-page',
  imports: [],
  templateUrl: './loading-page.component.html',
  styleUrl: './loading-page.component.css',
})
export class LoadingPageComponent {
  loadingTitle=input<string>();
  loadingSubtitle=input<string>();
  spinnerColor=input<string>();
}
