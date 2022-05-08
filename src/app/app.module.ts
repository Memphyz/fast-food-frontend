import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ComponentsModule } from './features/components/components.module';
import { SharedModule } from './features/shared/shared.module';
import { CommonModule } from '@angular/common';
import { Injector, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { faker } from '@faker-js/faker';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    ComponentsModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

  public static injector: Injector;

  constructor(private readonly injector: Injector) {
    AppModule.injector = this.injector
    console.log(faker.company.companyName())

  }
}
