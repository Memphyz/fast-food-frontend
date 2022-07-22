import { AddressType } from './../../../../core/enums/address.enum';
import { IAddress } from './../../../../core/interfaces/address.interface';
import { SelectOption } from './../../../../core/models/select-option.interface';
import { AddressService } from './../../../../core/services/address/address.service';
import { CepService } from './../../../../core/services/search/cep.service';
import { addressTypes } from './../../../shared/utils/city';
import { ALPHA } from './../../../shared/utils/regex.utils';
import { Component, DoCheck, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { filter, mergeMap, tap } from 'rxjs';
import { states } from 'src/app/features/shared/utils/city';

@UntilDestroy()
@Component({
  selector: 'fast-register-address',
  templateUrl: './register-address.component.html',
  styleUrls: ['./register-address.component.scss']
})
export class RegisterAddressComponent implements OnInit, DoCheck {

  public readonly form = new FormBuilder().group({
    postalCode: [undefined, [Validators.required, Validators.minLength(8), Validators.maxLength(8)]],
    address: [undefined, [Validators.required, Validators.minLength(2), Validators.maxLength(80), Validators.pattern(ALPHA)]],
    district: [undefined, [Validators.required, Validators.minLength(5), Validators.maxLength(80)]],
    number: [undefined, [Validators.required, Validators.maxLength(5)]],
    reference: [undefined, [Validators.maxLength(60)]],
    city: [undefined, [Validators.required, Validators.minLength(2), Validators.maxLength(50), Validators.pattern(ALPHA)]],
    state: [undefined, [Validators.required, Validators.minLength(2), Validators.maxLength(50), Validators.pattern(ALPHA)]],
    type: [undefined, [Validators.required]]
  });

  public readonly states = states.map((data) => new SelectOption(data.nome, data.sigla, data.sigla));
  public cities: SelectOption<string>[] = [];
  public readonly types: SelectOption<AddressType>[] = addressTypes;
  public addresses: IAddress[];

  @ViewChild('map') mapRef: ElementRef<HTMLIFrameElement>;

  public srcCache: string;
  public get src(): string {
    return `https://www.google.com/maps/embed/v1/place?key=AIzaSyBJ0DBgKEpHbmhsC3jLNjBTedXaDCRbCTs&q=${this.form.get('address').value || 'Brasil'},${this.form.get('number').value || ''}, ${this.form.get('postalCode').value || ''}`;
  }

  constructor(private readonly cepService: CepService, private readonly addressService: AddressService) {}

  public ngDoCheck(): void {
    this.mapRef?.nativeElement && this.srcCache !== this.src && (this.mapRef.nativeElement.src = this.src) && (this.srcCache = this.src);
  }

  public ngOnInit(): void {
    this.cepValueChanges();
    this.stateValueChanges();
    this.findAddresses();
  }

  public save(): void {
    this.form.valid && this.addressService.save({ ...this.form.value, country: 'BRAZIL' }).subscribe({
      next: () => this.addresses.unshift({ ...this.form.value, country: 'BRAZIL' }) && this.form.reset(),
    })
  }

  private findAddresses() {
    this.addressService.findAll().subscribe((address) => this.addresses = address);
  }
  private stateValueChanges(): void {
    this.form.get('state').valueChanges.pipe(untilDestroyed(this), tap(() => this.form.get('city').reset())).subscribe((state) =>
      this.cities = states.find((stateFind) => stateFind.sigla === state)
        ?.cidades?.map((cidade) => new SelectOption(cidade, cidade)));
  }

  private cepValueChanges(): void {
    this.form.get('postalCode').valueChanges.pipe(untilDestroyed(this), filter((cep: string): boolean => cep?.length === 8), mergeMap((cep: string) => this.cepService.findCep(cep)), tap(() => this.form.markAllAsTouched())).subscribe({
      next: (address: IAddress) => this.form.patchValue({ ...address, cep: address.postalCode }, { emitEvent: false }),
      error: (error: any) => error.status === 404 && this.form.reset()
    });
  }
}
