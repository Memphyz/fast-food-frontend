import { IRestaurant } from './../../../../core/interfaces/restaurant.interface';
import { MultipleTag } from './../../../../core/models/multiple-tag.model';
import { SelectOption } from './../../../../core/models/select-option.interface';
import { AddressService } from './../../../../core/services/address/address.service';
import {
  RestaurantService
} from './../../../../core/services/restaurant/restaurant.service';
import { UserService } from './../../../../core/services/user/user.service';
import { userId } from './../../../shared/utils/local-storage';
import {
  applyValidatorIfCondition,
  requiredIfAnyFieldFormHasValue
} from './../../../shared/validators/form';
import { isHour } from './../../../shared/validators/hour';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { cloneDeep } from 'lodash';
import { map, mergeMap } from 'rxjs';
import { PaymentType } from 'src/app/core/enums/payment.enum';
import { IProduct } from 'src/app/core/interfaces/product.interface';
import { ProductService } from 'src/app/core/services/product/product.service';
import { ALPHA } from 'src/app/features/shared/utils/regex.utils';

@Component({
  selector: 'fast-restaurant-register',
  templateUrl: './restaurant-register.component.html',
  styleUrls: ['./restaurant-register.component.scss']
})
export class RestaurantRegisterComponent implements OnInit {

  public address: SelectOption<string>[] = [];
  public owners: SelectOption<string>[] = [];
  public productTags: MultipleTag<IProduct>[] = [];
  public addictionalTags: MultipleTag<IProduct>[] = [];

  public readonly form = new FormBuilder().group({
    photo: [undefined, Validators.required],
    active: [true, Validators.required],
    name: [undefined, [Validators.required, Validators.minLength(5), Validators.maxLength(50), Validators.pattern(ALPHA)]],
    kitchen: [undefined, [Validators.required, Validators.minLength(5), Validators.maxLength(120), Validators.pattern(ALPHA)]],
    freight: [0, [Validators.required, Validators.min(0), Validators.max(999.99), Validators.maxLength(5)]],
    open: [undefined, [Validators.required, isHour]],
    close: [undefined, [Validators.required, isHour]],
    address: [undefined, Validators.required],
    owner: [undefined],
    product: new FormBuilder().group({
      name: [undefined, [Validators.minLength(5), Validators.maxLength(50), Validators.pattern(ALPHA)]],
      price: [0, [Validators.min(0), Validators.max(999.99), Validators.maxLength(5)]],
      image: [undefined],
      active: [true],
      description: [undefined, [Validators.minLength(5), Validators.maxLength(255), Validators.pattern(ALPHA)]],
      additional: new FormBuilder().group({
        unitPrice: [undefined, [Validators.min(0), Validators.max(999.99), Validators.maxLength(5)]],
        name: [undefined, [Validators.minLength(5), Validators.maxLength(50), Validators.pattern(ALPHA)]],
        description: [undefined, [Validators.minLength(5), Validators.maxLength(255), Validators.pattern(ALPHA)]],
      }, {
        validator: [
          requiredIfAnyFieldFormHasValue('unitPrice', [Validators.required, Validators.min(0), Validators.max(999.99), Validators.maxLength(5)]),
          requiredIfAnyFieldFormHasValue('name', [Validators.required, Validators.minLength(5), Validators.maxLength(50), Validators.pattern(ALPHA)]),
          requiredIfAnyFieldFormHasValue('description', [Validators.required, Validators.minLength(5), Validators.maxLength(255), Validators.pattern(ALPHA)]),
        ]
      }),
      addictionals: new FormArray([])
    }, {
      validator: [
        applyValidatorIfCondition('name', [Validators.required, Validators.minLength(5), Validators.maxLength(50), Validators.pattern(ALPHA)], (form: FormGroup) => !(form.controls['products'] as FormArray)?.value?.length),
        applyValidatorIfCondition('price', [Validators.required, Validators.min(0), Validators.max(999.99), Validators.maxLength(5)], (form: FormGroup) => !(form.controls['products'] as FormArray)?.value?.length),
        applyValidatorIfCondition('image', Validators.required, (form: FormGroup) => !(form.controls['products'] as FormArray)?.value?.length),
        applyValidatorIfCondition('active', Validators.required, (form: FormGroup) => !(form.controls['products'] as FormArray)?.value?.length),
        applyValidatorIfCondition('description', [Validators.required, Validators.minLength(5), Validators.maxLength(255), Validators.pattern(ALPHA)], (form: FormGroup) => !(form.controls['products'] as FormArray)?.value?.length),
      ]
    }),
    products: new FormArray([])
  })

  private userPage = 0;
  private userSearch: string;
  private addressPage = 0;
  private addressSearch: string;

  public get canAddAddictional(): boolean {
    return Object.values(this.form.get('product.additional').value).every((value => !!value))
  }

  public get products(): FormArray {
    return this.form.get('products') as FormArray;
  }

  public get addictionals(): FormArray {
    return this.form.get('product.addictionals') as FormArray;
  }

  constructor(private readonly addressService: AddressService, private readonly userService: UserService, public readonly restaurantService: RestaurantService, private readonly productService: ProductService) {}

  public ngOnInit(): void {
    this.fetchAddresses();
    this.fetchUsers();
  }

  public submit(): void {
    if (this.form.get('product').valid && Object.entries(this.form.get('product').value).filter(([key, _value]) => key !== 'additional' && key !== 'additionals' && key !== 'active').every(([key, value]) => !!value)) {
      this.btnAddProduct();
    }
    const products: IProduct[] = this.form.controls['products'].value
    const body: IRestaurant = {
      ...this.form.value,
      owners: this.form.get('owner').value ? [userId(), this.form.get('owner').value] : [userId()],
      payments: [PaymentType.CASH, PaymentType.PIX, PaymentType.DEBIT_CARD, PaymentType.CREDIT_CARD],
      rate: 0,
      products: []
    }
    delete (body as any).owner
    delete (body as any).product
    this.restaurantService.save(body).pipe(map((restaurant) => products.map((product): IProduct => { return { ...product, restaurant: restaurant.body.id } })), mergeMap((products) => this.productService.saveAll(products))).subscribe()

  }

  public btnAddProduct(): void {
    this.productTags.push(this.mountTag());
    this.products.push(cloneDeep(this.form.get('product')));
    this.form.get('product').reset({ active: true });
  }

  public btnAddAddictional(): void {
    this.addictionalTags.push(this.mountTagAdditional());
    this.addictionals.push(cloneDeep(this.form.get('product.additional')));
    this.form.get('product.additional').reset({ active: true });
  }

  public mountTag(): MultipleTag<IProduct> {
    return {
      editing: false,
      titile: this.form.get('product.name').value,
      value: this.form.get('product').value
    };
  }

  public mountTagAdditional(): MultipleTag<IProduct> {
    return {
      editing: false,
      titile: this.form.get('product.additional.name').value,
      value: this.form.get('product.additional').value
    };
  }

  public scrollUser(): void {
    ++this.userPage;
    this.fetchUsers();
  }

  public scrollAddress(): void {
    ++this.addressPage;
    this.fetchAddresses();
  }

  public searchUser(search: string): void {
    this.userSearch = search;
    this.owners = [];
    this.fetchUsers();
  }
  public searchAddress(search: string): void {
    this.addressSearch = search;
    this.address = [];
    this.fetchAddresses();
  }

  private fetchUsers(): void {
    this.userService.findAll({ limit: 5, page: this.userPage, projection: 'name id cpf surname', search: this.userSearch }).subscribe((users) => this.owners.push(...users.map((user) => new SelectOption(`${user.name} ${user.surname}`, user.id, user.cpf))));
  }

  private fetchAddresses(): void {
    this.addressService.findAll({ limit: 5, page: this.addressPage, projection: 'address number id postalCode', search: this.addressSearch }).subscribe((addresses) => this.address.push(...addresses.map((address) => new SelectOption(`${address.address}, ${address.number}`, address.id, address.postalCode.replace(/^(\d{5})(\d{3})+?$/, `$1-$2`)))));
  }
}
