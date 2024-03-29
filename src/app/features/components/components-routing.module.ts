import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuard } from './../../core/guards/logged.guard';
import {
  RegisterAddressComponent
} from './address/register-adrress/register-address.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './login/register/register.component';
import { SignInComponent } from './login/sign-in/sign-in.component';
import { OrdersComponent } from './orders/orders.component';
import {
  RestaurantManagerComponent
} from './restaurant/restaurant-manager/restaurant-manager.component';
import {
  RestaurantRegisterComponent
} from './restaurant/restaurant-register/restaurant-register.component';
import { RestaurantComponent } from './restaurant/restaurant.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: '*',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'orders',
    component: OrdersComponent
  },
  {
    path: 'address',
    loadChildren: () => import('./address/address-routing.module').then((module) => module.AddressRoutingModule)
  },
  {
    path: 'address/register',
    canActivate: [LoginGuard],
    component: RegisterAddressComponent
  },
  {
    path: 'register',
    canActivate: [LoginGuard],
    component: RegisterComponent
  },
  {
    path: 'sign-in',
    canActivate: [LoginGuard],
    component: SignInComponent
  },
  {
    path: 'restaurant/view/:id',
    component: RestaurantComponent
  },
  {
    path: 'restaurant/manager',
    component: RestaurantManagerComponent
  },
  {
    path: 'restaurant/register',
    component: RestaurantRegisterComponent
  },
  {
    path: 'restaurant/edit/:id',
    component: RestaurantRegisterComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComponentsRoutingModule {}
