import { SelectOption } from './../../../../core/models/select-option.interface';
import { AddressService } from './../../../../core/services/address/address.service';
import { UserService } from './../../../../core/services/user/user.service';
import { isHour } from './../../../shared/validators/hour';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { ALPHA } from 'src/app/features/shared/utils/regex.utils';

@Component({
  selector: 'fast-restaurant-register',
  templateUrl: './restaurant-register.component.html',
  styleUrls: ['./restaurant-register.component.scss']
})
export class RestaurantRegisterComponent implements OnInit {

  public address: SelectOption<string>[] = [];
  public owners: SelectOption<string>[] = [];

  public readonly form = new FormBuilder().group({
    photo: [undefined, Validators.required],
    active: [true, Validators.required],
    name: [undefined, [Validators.required, Validators.minLength(5), Validators.maxLength(50), Validators.pattern(ALPHA)]],
    kitchen: [undefined, [Validators.required, Validators.minLength(5), Validators.maxLength(120), Validators.pattern(ALPHA)]],
    freight: [0, [Validators.required, Validators.min(0), Validators.max(999), Validators.maxLength(5)]],
    open: [undefined, [Validators.required, isHour]],
    close: [undefined, [Validators.required, isHour]],
    address: [undefined, Validators.required],
    owners: [undefined],
    product: new FormBuilder().group({
      name: [undefined, [Validators.required, Validators.minLength(5), Validators.maxLength(50), Validators.pattern(ALPHA)]],
      price: [0, [Validators.required, Validators.min(0), Validators.max(999), Validators.maxLength(5)]],
      image: [undefined, Validators.required],
      active: [true, Validators.required],
      description: [undefined, [Validators.required, Validators.minLength(5), Validators.maxLength(255), Validators.pattern(ALPHA)]],
      additional: new FormBuilder().group({
        unitPrice: [0, [Validators.required, Validators.min(0), Validators.max(999), Validators.maxLength(5)]],
        name: [undefined, [Validators.required, Validators.minLength(5), Validators.maxLength(50), Validators.pattern(ALPHA)]],
        description: [undefined, [Validators.required, Validators.minLength(5), Validators.maxLength(255), Validators.pattern(ALPHA)]],
      }),
      addictionals: new FormArray([])
    }),
    products: new FormArray([])
  })

  private userPage = 0;
  private userSearch: string;
  private addressPage = 0;
  private addressSearch: string;

  constructor(private readonly addressService: AddressService, private readonly userService: UserService) {}

  public ngOnInit(): void {
    this.form.markAllAsTouched();
    this.fetchAddresses();
    this.fetchUsers();
  }

  public submit(): void {
    console.log(this.form.value);

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
