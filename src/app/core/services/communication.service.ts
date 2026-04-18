import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CommunicationService {

  trigger = signal<number>(0);

  reCallGetSpecificProductData() {
    this.trigger.update(v => v + 1);
  }


}
