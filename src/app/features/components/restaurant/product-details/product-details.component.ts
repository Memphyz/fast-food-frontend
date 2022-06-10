import { Product } from './../../../../core/interfaces/product.interface';
import { Restaurant } from './../../../../core/interfaces/restaurant.interface';
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

  @HostBinding('style.--image')
  public get productImage(): string {
    return `url(${this.product.image})`;
  }

  constructor(private readonly modalRef: BsModalRef) {
  }

  public btnClose(): void {
    this.modalRef.hide();
  }

}
