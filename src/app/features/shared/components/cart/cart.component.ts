import { Cart } from './cart';
import { Component } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'fast-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {

  public cart = Cart.cart();

  constructor(public readonly modalRef: BsModalRef) {

  }
}
