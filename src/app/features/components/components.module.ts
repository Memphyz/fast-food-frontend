import { SharedModule } from '../shared/shared.module';
import { ComponentsRoutingModule } from './components-routing.module';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './login/register/register.component';
import { SignInComponent } from './login/sign-in/sign-in.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { RestaurantComponent } from './restaurant/restaurant.component';

@NgModule({
  declarations: [
    HomeComponent,
    RegisterComponent,
    SignInComponent,
    RestaurantComponent,
  ],
  imports: [
    ComponentsRoutingModule,
    FormsModule,
    CommonModule,
    InfiniteScrollModule,
    ReactiveFormsModule,
    SharedModule,
  ],
})
export class ComponentsModule {}
