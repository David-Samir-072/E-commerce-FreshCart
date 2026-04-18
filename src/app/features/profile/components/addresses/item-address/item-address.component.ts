import { Component, inject, input, output, signal } from '@angular/core';
import { AddressesService } from '../addresses.service';

@Component({
  selector: 'app-item-address',
  imports: [],
  templateUrl: './item-address.component.html',
  styleUrl: './item-address.component.css',
})
export class ItemAddressComponent {
  private readonly addressesService = inject(AddressesService)
  address = input.required<Iaddress>()
  addressesList = output<Iaddress[]>()
  AddressToUpdate = output<Iaddress>()
  openModal = output<boolean>()
  isModalAdd = output<boolean>()
  loadingDelete = signal<boolean>(false)


  deleteAddress() {
    if (this.loadingDelete()) return;

    this.loadingDelete.set(true)
    this.addressesService.removeAddress(this.address()._id).subscribe({
      next: res => {
        this.loadingDelete.set(false)
        this.addressesList.emit(res.data)
      },
      error: err => {
        this.loadingDelete.set(false)
      }
    })
  }


  editAddress(){
    if (this.loadingDelete()) return
    this.AddressToUpdate.emit(this.address())
    this.isModalAdd.emit(false)
    this.openModal.emit(true)
  }
}
