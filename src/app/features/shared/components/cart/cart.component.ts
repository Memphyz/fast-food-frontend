import { SelectOption } from '../../../../core/models/select-option.interface';
import { detectCardFlag } from '../../utils/card-flag.utils';
import { ALPHA } from '../../utils/regex.utils';
import { IOrder, IProductOrder } from './../../../../core/interfaces/order.interface';
import { IPayment } from './../../../../core/interfaces/payment.interface';
import { IProduct } from './../../../../core/interfaces/product.interface';
import { userId } from './../../utils/local-storage';
import { Cart } from './cart';
import { Clipboard } from '@angular/cdk/clipboard';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { uniqueId } from 'lodash';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { QrCodePix } from 'qrcode-pix';

@UntilDestroy()
@Component({
  selector: 'fast-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  public cart = Cart.cart();
  public flag: string;
  public endereco: number;
  public enderecos: SelectOption<number>[] = [
    {
      label: 'Endereco 3',
      sublabel: '03978400',
      value: 3
    },
    {
      label: 'Endereco 4',
      sublabel: '03978400',
      value: 4
    },
    {
      label: 'Endereco 5',
      sublabel: '03978400',
      value: 5
    },
    {
      label: 'Endereco 6',
      sublabel: '03978400',
      value: 6
    },
    {
      label: 'Endereco 7',
      sublabel: '03978400',
      value: 7
    }
  ]
  public pix: {
    payload: () => string;
    base64: (options?) => Promise<string>;
    image?: string;
  };
  public payments: IPayment[] = [
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
    name: [undefined, [Validators.required, Validators.minLength(2)]],
    address: new FormBuilder().group({
      postalCode: [undefined, [Validators.required, Validators.minLength(8), Validators.maxLength(8)]],
      street: [undefined, [Validators.required, Validators.minLength(2), Validators.maxLength(80)]],
      number: [undefined, [Validators.required, Validators.minLength(1), Validators.maxLength(8), Validators.pattern(ALPHA)]],
      district: [undefined, [Validators.minLength(5), Validators.maxLength(80)]],
      city: [undefined, [Validators.required, Validators.minLength(2), Validators.maxLength(50), Validators.pattern(ALPHA)]],
      state: [undefined, [Validators.required, Validators.minLength(2), Validators.maxLength(50), Validators.pattern(ALPHA)]],
      complement: [undefined, Validators.maxLength(60)],
      reference: [undefined, [Validators.minLength(2), Validators.maxLength(100)]],
      type: [undefined, [Validators.required, Validators.pattern(/^(COMMERCIAL|RESIDENTIAL|KINSHIP)$/)]]
    })
  })

  public selected: IPayment;

  constructor(public readonly modalRef: BsModalRef, private clipboard: Clipboard, private readonly toastr: ToastrService, private readonly router: Router) {
  }

  public ngOnInit(): void {
    this.form.get('card').valueChanges.pipe(untilDestroyed(this)).subscribe((card: string): string => this.flag = detectCardFlag(card))
  }

  public newAdress(): void {
    this.router.navigate(['new-address']);
    this.modalRef.hide();
  }

  public async generatePix(): Promise<void> {
    if (this.pix) {
      return undefined;
    }
    this.pix = QrCodePix({
      version: '01',
      key: 'b974b2d1-5c24-4357-a46e-11e18f343eb2',
      name: 'Lucas Alves RIbeiro',
      city: 'SAO PAULO',
      transactionId: uniqueId(),
      message: 'Fast Food Frontend Pix Payment :D',
      cep: '99999999',
      value: 0,
    });
    this.pix.image = await this.pix.base64();
  }

  public copy(): void {
    this.clipboard.copy(this.pix.payload());
    this.toastr.success('', 'Código copiado com sucesso!');
  }

  public productTotalPrice(product: IProduct): number {
    const totalAddictionals = product.additionals?.map((addictional => addictional.total)).reduce((acumulator, totalAddictionals): number => acumulator + totalAddictionals, 0)
    return product.price + totalAddictionals;
  }

  public pay(): void {
    if (this.selected.type === 'CREDIT_CARD' || this.selected.type === 'DEBIT_CARD') {
      // Validate card, not implemented because payment its fake!
    }
    const order: IOrder = {
      user: userId(),
      products: this.cart.products.map((product): IProductOrder => Object.create({ id: product.id, notes: product.notes })),
      payment: this.selected.type,
      address: this.form.get('address').value,
    }
    console.log(order);

  }
}
