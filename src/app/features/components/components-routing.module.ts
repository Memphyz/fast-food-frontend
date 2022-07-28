import { LoginGuard } from './../../core/guards/logged.guard';
import {
  RegisterAddressComponent
} from './address/register-adrress/register-address.component';
import { HomeComponent } from './home/home.component';
import { SignInComponent } from './login/sign-in/sign-in.component';
import { OrdersComponent } from './orders/orders.component';
import { RestaurantComponent } from './restaurant/restaurant.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


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
    path: 'register',
    canActivate: [LoginGuard],
    component: RegisterAddressComponent
  },
  {
    path: 'sign-in',
    canActivate: [LoginGuard],
    component: SignInComponent
  },
  {
    path: 'restaurant/:id',
    component: RestaurantComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComponentsRoutingModule {}
