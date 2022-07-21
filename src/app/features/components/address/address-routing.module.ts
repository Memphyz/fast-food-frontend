import { AddressComponent } from './address.component';
import { RegisterAddressComponent } from './register-adrress/register-address.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: AddressComponent
  },
  {
    path: 'register',
    component: RegisterAddressComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddressRoutingModule {}
