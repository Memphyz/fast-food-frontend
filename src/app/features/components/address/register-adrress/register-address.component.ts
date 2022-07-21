import { IAddress } from './../../../../core/interfaces/address.interface';
import { CepService } from './../../../../core/services/search/cep.service';
import { ALPHA } from './../../../shared/utils/regex.utils';
import { Component, DoCheck, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { filter, mergeMap } from 'rxjs';

@UntilDestroy()
@Component({
  selector: 'fast-register-address',
  templateUrl: './register-address.component.html',
  styleUrls: ['./register-address.component.scss']
})
export class RegisterAddressComponent implements OnInit, DoCheck {

  public readonly form = new FormBuilder().group({
    cep: [undefined, [Validators.required, Validators.minLength(8), Validators.maxLength(8)]],
    address: [undefined, [Validators.required, Validators.minLength(2), Validators.maxLength(80), Validators.pattern(ALPHA)]],
    district: [undefined, [Validators.required, Validators.minLength(5), Validators.maxLength(80)]],
    number: [undefined, [Validators.required, Validators.maxLength(5)]],
    reference: [undefined, [Validators.maxLength(60)]],
    city: [undefined, [Validators.required, Validators.minLength(2), Validators.maxLength(50), Validators.pattern(ALPHA)]],
    state: [undefined, [Validators.required, Validators.minLength(2), Validators.maxLength(50), Validators.pattern(ALPHA)]],
  });

  @ViewChild('map') mapRef: ElementRef<HTMLIFrameElement>;

  public srcCache: string;
  public get src(): string {
    return `https://www.google.com/maps/embed/v1/place?key=AIzaSyBJ0DBgKEpHbmhsC3jLNjBTedXaDCRbCTs&q=${this.form.get('address').value || 'Brasil'},${this.form.get('number').value || ''}${this.form.get('cep').value || ''}`;
  }

  constructor(private readonly cepService: CepService, private sanitizer: DomSanitizer) {}

  public ngDoCheck(): void {
    this.mapRef?.nativeElement && this.srcCache !== this.src && (this.mapRef.nativeElement.src = this.src) && (this.srcCache = this.src);
  }

  public ngOnInit(): void {
    this.form.get('cep').valueChanges.pipe(untilDestroyed(this), filter((cep: string): boolean => cep?.length === 8), mergeMap((cep: string) => this.cepService.findCep(cep))).subscribe({
      next: (address: IAddress) => this.form.patchValue({ ...address, cep: address.postalCode }, { emitEvent: false }),
      error: (error: any) => error.status === 404 && this.form.reset()
    });

  }

}
