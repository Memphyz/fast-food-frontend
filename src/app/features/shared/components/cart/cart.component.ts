import { detectCardFlag } from '../../utils/card-flag.utils';
import { Payment } from './../../../../core/interfaces/payment.interface';
import { Product } from './../../../../core/interfaces/product.interface';
import { Cart } from './cart';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'fast-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {

  public cart = Cart.cart();
  public payments: Payment[] = [
    {
      name: 'Pix',
      type: 'PIX',
      icon: 'pix',
      color: '#4ab2a4'
    },
    {
      name: 'Dinheiro',
      type: 'CASH',
      icon: 'cash',
      color: '#4fba6f'
    },
    {
      name: 'Débito',
      type: 'DEBIT_CARD',
      icon: 'debit',
      color: '#0152cc'
    },
    {
      name: 'Crédito',
      type: 'CREDIT_CARD',
      icon: 'credit',
      color: '#d22f2f'
    },
  ]

  public form = new FormBuilder().group({
    card: [undefined, [Validators.pattern(/^[0,9]{, 16}/), Validators.required, Validators.minLength(12)]],
    day: [undefined, [Validators.pattern(/^[0,9]{, 2}/), Validators.required, Validators.minLength(2)]],
    year: [undefined, [Validators.pattern(/^[0,9]{, 4}/), Validators.required, Validators.minLength(4)]],
    name: [undefined, [Validators.pattern(/^\w/), Validators.required, Validators.minLength(2)]]
  })

  public selected: Payment;

  constructor(public readonly modalRef: BsModalRef) {
    console.log(detectCardFlag('6504985259328334'));

  }

  public productTotalPrice(product: Product): number {
    const totalAddictionals = product.additionals?.map((addictional => addictional.total)).reduce((acumulator, totalAddictionals): number => acumulator + totalAddictionals, 0)
    return product.price + totalAddictionals;
  }
}
