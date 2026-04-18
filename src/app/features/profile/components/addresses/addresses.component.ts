import { Component, inject, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { AddressesModalComponent } from "../addresses-modal/addresses-modal.component";
import { AddressesService } from './addresses.service';
import { LoadingPageComponent } from "../../../../shared/ui/loading-page/loading-page.component";
import { EmptyAddressesComponent } from "./empty-addresses/empty-addresses.component";
import { ItemAddressComponent } from "./item-address/item-address.component";
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-addresses',
  imports: [AddressesModalComponent, LoadingPageComponent, EmptyAddressesComponent, ItemAddressComponent],
  templateUrl: './addresses.component.html',
  styleUrl: './addresses.component.css',
})
export class AddressesComponent implements OnInit  {
  private readonly addressesService=inject(AddressesService)
  private readonly pLATFORM_ID=inject(PLATFORM_ID)
  openModal=signal<boolean>(false)
  isModalAdd=signal<boolean>(true)
  AddressToUpdate= signal<Iaddress>({} as Iaddress)
  loadingAdresses=signal<boolean>(false)
  AddressesList = signal<Iaddress[]>([])

  ngOnInit(): void {
    if (isPlatformBrowser(this.pLATFORM_ID)) {
    this.getLoggedUserAddressesData()
    }
  }

  getLoggedUserAddressesData() {
    this.loadingAdresses.set(true)
    this.addressesService.getLoggedUserAddresses().subscribe({
      next: (res) => {
        this.loadingAdresses.set(false)
        this.AddressesList.set(res.data)
        
      },
      error: (err) => {
        this.loadingAdresses.set(false)
      }
    })
  }
}
 