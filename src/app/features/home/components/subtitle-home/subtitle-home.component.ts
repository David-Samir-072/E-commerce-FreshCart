import { Component, input } from '@angular/core';

@Component({
  selector: 'app-subtitle-home',
  imports: [],
  templateUrl: './subtitle-home.component.html',
  styleUrl: './subtitle-home.component.css',
})
export class SubtitleHomeComponent {
  title=input.required<string[]>();
}
