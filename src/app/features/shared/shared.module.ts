import { HeaderComponent } from './header/header.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule,
    CommonModule,
    HttpClientModule
  ],
  exports: [HeaderComponent],
  declarations: [
    HeaderComponent
  ],
})
export class SharedModule {}
