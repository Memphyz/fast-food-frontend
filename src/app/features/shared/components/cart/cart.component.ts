import { ICart } from './../../../../core/interfaces/cart.interface';
import { Cart } from './cart';
import { Component } from '@angular/core';

@Component({
  selector: 'fast-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {

  public get cart(): ICart {
    return Cart.cart();
  }

  public log(item): void {
    console.log(item)
  }
}
