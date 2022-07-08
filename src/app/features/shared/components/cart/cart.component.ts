import { detectCardFlag } from '../../utils/card-flag.utils';
import { Payment } from './../../../../core/interfaces/payment.interface';
import { Product } from './../../../../core/interfaces/product.interface';
import { Cart } from './cart';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { BsModalRef } from 'ngx-bootstrap/modal';

@UntilDestroy()
@Component({
  selector: 'fast-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  public cart = Cart.cart();
  public flag: string;
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
  public today: Date = new Date();
  public get maxDate(): Date {
    return new Date(this.today.getFullYear() + 20, this.today.getMonth(), this.today.getDate())
  }
  public form = new FormBuilder().group({
    card: [undefined, [Validators.required, Validators.minLength(16), Validators.pattern(/^\d/)]],
    limit: [undefined, Validators.required],
    cvc: [undefined, [Validators.required, Validators.minLength(3), Validators.maxLength(4)]],
    name: [undefined, [Validators.required, Validators.minLength(2)]]
  })

  public selected: Payment;

  constructor(public readonly modalRef: BsModalRef) {
  }

  public ngOnInit(): void {
    this.form.get('card').valueChanges.pipe(untilDestroyed(this)).subscribe((card: string): string => this.flag = detectCardFlag(card))
  }

  public productTotalPrice(product: Product): number {
    const totalAddictionals = product.additionals?.map((addictional => addictional.total)).reduce((acumulator, totalAddictionals): number => acumulator + totalAddictionals, 0)
    return product.price + totalAddictionals;
  }
}
