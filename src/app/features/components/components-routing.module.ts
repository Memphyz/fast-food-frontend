import { LoginGuard } from './../../core/guards/logged.guard';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './login/register/register.component';
import { SignInComponent } from './login/sign-in/sign-in.component';
import { NewAddressComponent } from './new-address/new-address.component';
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
    path: 'new-address',
    component: NewAddressComponent
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
    path: 'restaurant/:id',
    component: RestaurantComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComponentsRoutingModule {}
