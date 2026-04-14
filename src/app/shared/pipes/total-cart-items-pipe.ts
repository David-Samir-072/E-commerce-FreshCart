import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'totalCartItems',
})
export class TotalCartItemsPipe implements PipeTransform {
  transform(cart: CartItem[]): string {
    const count = cart.reduce((sum, item) => sum += item.count, 0);
    return count === 1 ? '1 item' : `${count} items`
  }
}
