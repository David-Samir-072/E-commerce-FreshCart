import { Component, output } from '@angular/core';

@Component({
  selector: 'app-empty-addresses',
  imports: [],
  templateUrl: './empty-addresses.component.html',
  styleUrl: './empty-addresses.component.css',
})
export class EmptyAddressesComponent {
  openModal=output<boolean>()
  isModalAdd=output<boolean>()


}
