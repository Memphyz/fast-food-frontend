import { SharedModule } from '../../shared/shared.module';
import { AddressRoutingModule } from './address-routing.module';
import { AddressComponent } from './address.component';
import { RegisterAddressComponent } from './register-adrress/register-address.component';
import { CommonModule } from '@angular/common';
import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NgxMaskModule } from 'ngx-mask';

@NgModule({
  declarations: [AddressComponent, RegisterAddressComponent],
  imports: [
    SharedModule,
    FormsModule,
    CommonModule,
    InfiniteScrollModule,
    ReactiveFormsModule,
    AddressRoutingModule,
    NgxMaskModule
  ],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: "pt-BR"
    },
    {
      provide: DEFAULT_CURRENCY_CODE,
      useValue: 'BRL'
    },
  ]
})
export class AddressModule {}
