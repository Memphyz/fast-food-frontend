import { SelectOption } from '../../../../core/models/select-option.interface';
import { detectCardFlag } from '../../utils/card-flag.utils';
import { IAddress } from './../../../../core/interfaces/address.interface';
import { IOrder, IProductOrder } from './../../../../core/interfaces/order.interface';
import { IPayment } from './../../../../core/interfaces/payment.interface';
import { IProduct } from './../../../../core/interfaces/product.interface';
import { AddressService } from './../../../../core/services/address/address.service';
import { OrderService } from './../../../../core/services/order/order.service';
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
import { map } from 'rxjs';

@UntilDestroy()
@Component({
  selector: 'fast-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  public cart = Cart.cart();
  public flag: string;
  public page = 0;
  public addresses: SelectOption<IAddress>[]
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
    address: [undefined, [Validators.required]]
  })

  public selected: IPayment;

  public get address(): IAddress {
    return this.form.get('address').value;
  }

  constructor(
    public readonly modalRef: BsModalRef,
    private readonly clipboard: Clipboard,
    private readonly toastr: ToastrService,
    private readonly addressService: AddressService,
    private readonly orderService: OrderService,
    private readonly router: Router) {
  }

  public ngOnInit(): void {
    this.form.get('card').valueChanges.pipe(untilDestroyed(this)).subscribe((card: string): string => this.flag = detectCardFlag(card));
    this.addressService.findAll({ page: this.page, limit: 5 }).pipe(map((addresses) => addresses.map((address) => new SelectOption(`${address.address}, ${address.number}`, address, address.postalCode.replace(/^(\d{5})(\d{3})+?$/, `$1-$2`))))).subscribe((address) => this.addresses = address)
  }

  public newAdress(): void {
    this.router.navigate(['address', 'register']);
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
      products: this.cart.products.map((product): IProductOrder => { return { id: product.id, notes: product.notes } }),
      payment: this.selected.type,
      address: this.form.get('address').value?.id,
    }
    console.log(order);
    this.orderService.save(order).subscribe()

  }
}
