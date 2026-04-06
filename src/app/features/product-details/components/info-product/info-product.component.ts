import { Component, input, signal } from '@angular/core';
import { StarsProductComponent } from "../../../../shared/ui/stars-product/stars-product.component";
import { DiscountCalcPipe } from '../../../../shared/pipes/discount-calc-pipe';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-info-product',
  imports: [StarsProductComponent,DiscountCalcPipe,FormsModule,CommonModule],
  templateUrl: './info-product.component.html',
  styleUrl: './info-product.component.css',
})
export class InfoProductComponent {
  product=input.required<Iproduct>()
  value=signal<number>(1);

  updateNumber(num:number):void{
    if (this.value()>=this.product().quantity && num===1) {return}
    if ( this.value()===1 && num===-1) {return}
    this.value.update(value=>value+num)
  }

  onValueChange(val: number) {
  const min = 1;
  const max = this.product().quantity;

  if (val < min) val = min;
  if (val > max) val = max;
}

}
