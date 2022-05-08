import { HeaderComponent } from './header/header.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule,
    CommonModule
  ],
  exports: [HeaderComponent],
  declarations: [
    HeaderComponent
  ],
})
export class SharedModule {}
