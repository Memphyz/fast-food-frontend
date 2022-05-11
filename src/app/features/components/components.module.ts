import { SharedModule } from '../shared/shared.module';
import { ComponentsRoutingModule } from './components-routing.module';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './login/register/register.component';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignInComponent } from './login/sign-in/sign-in.component';

@NgModule({
  declarations: [
    HomeComponent,
    RegisterComponent,
    SignInComponent,
  ],
  imports: [
    ComponentsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
  ],
})
export class ComponentsModule {}
