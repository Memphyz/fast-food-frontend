import { Product } from './../../../../core/interfaces/product.interface';
import {
  Additional,
  Restaurant
} from './../../../../core/interfaces/restaurant.interface';
import { Cart } from './../../../shared/components/cart/cart';
import { Component, HostBinding } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'fast-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent {

  public readonly restaurant: Restaurant;
  public product: Product;
  public total: number;

  @HostBinding('style.--image')
  public get productImage(): string {
    return `url(${this.product.image})`;
  }

  constructor(private readonly modalRef: BsModalRef) {
  }

  public btnClose(): void {
    this.modalRef.hide();
  }

  public btnAdd(): void {
    Cart.add(this.product, this.total);
    this.btnClose();
  }

  public btnMinusAdictional(addictional: Additional): void {
    if (addictional.quantity > 0) {
      (this.total = (this.total || this.product.price) - addictional.unitPrice);
      addictional.quantity = addictional.quantity - 1;
    }
    addictional.total = addictional.unitPrice * addictional.quantity;
  }

  public btnAddAdictional(addictional: Additional): void {
    (this.total = (this.total || this.product.price) + addictional.unitPrice);
    addictional.quantity = addictional.quantity + 1;
    addictional.total = addictional.unitPrice * addictional.quantity;
  }

}
