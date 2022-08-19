import { SelectOption } from './../../../../core/models/select-option.interface';
import { AddressService } from './../../../../core/services/address/address.service';
import { UserService } from './../../../../core/services/user/user.service';
import { isHour } from './../../../shared/validators/hour';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
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
    freight: [undefined, [Validators.required, Validators.min(0), Validators.max(999), Validators.maxLength(5)]],
    open: [undefined, [Validators.required, isHour]],
    close: [undefined, [Validators.required, isHour]],
    address: [undefined, Validators.required],
    owners: [undefined]

  })

  constructor(private readonly addressService: AddressService, private readonly userService: UserService) {}

  public ngOnInit(): void {
    this.form.markAllAsTouched();
    this.addressService.findAll().subscribe((addresses) => this.address.push(...addresses.map((address) => new SelectOption(`${address.address}, ${address.number}`, address.id, address.postalCode.replace(/^(\d{5})(\d{3})+?$/, `$1-$2`))))),
      this.userService.findAll().subscribe((users) => this.owners.push(...users.map((user) => new SelectOption(user.name, user.id, user.cpf))))
  }

}
