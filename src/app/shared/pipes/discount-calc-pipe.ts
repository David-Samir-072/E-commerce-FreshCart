import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'discountCalc',
})
export class DiscountCalcPipe implements PipeTransform {
  transform(oldPrice:number,newPrice:number): string {
    const discount = ((oldPrice - newPrice) / oldPrice) * 100;
    return `${(discount.toFixed(0))}%`;
  }
}
