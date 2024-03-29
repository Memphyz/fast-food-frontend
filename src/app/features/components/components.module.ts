import { SharedModule } from '../shared/shared.module';
import { AddressModule } from './address/address.module';
import { ComponentsRoutingModule } from './components-routing.module';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './login/register/register.component';
import { SignInComponent } from './login/sign-in/sign-in.component';
import {
  ProductDetailsComponent
} from './restaurant/product-details/product-details.component';
import {
  RestaurantDetailsModalComponent
} from './restaurant/restaurant-details-modal/restaurant-details-modal.component';
import { RestaurantComponent } from './restaurant/restaurant.component';
import { CommonModule, registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NgxMaskModule } from 'ngx-mask';
import { OrdersComponent } from './orders/orders.component';
import { RestaurantRegisterComponent } from './restaurant/restaurant-register/restaurant-register.component';
import { RestaurantManagerComponent } from './restaurant/restaurant-manager/restaurant-manager.component';

registerLocaleData(localePt);

@NgModule({
  declarations: [
    HomeComponent,
    RegisterComponent,
    SignInComponent,
    RestaurantComponent,
    RestaurantDetailsModalComponent,
    ProductDetailsComponent,
    OrdersComponent,
    RestaurantRegisterComponent,
    RestaurantManagerComponent,
  ],
  imports: [
    ComponentsRoutingModule,
    FormsModule,
    CommonModule,
    AddressModule,
    InfiniteScrollModule,
    ReactiveFormsModule,
    SharedModule,
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
export class ComponentsModule {}
