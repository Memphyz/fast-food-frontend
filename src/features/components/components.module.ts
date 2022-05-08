import { SharedModule } from '../shared/shared.module';
import { ComponentsRoutingModule } from './components-routing.module';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [ComponentsRoutingModule, SharedModule],
})
export class ComponentsModule {}
