import { template } from './features/shared/spinner';
import { Component } from '@angular/core';

@Component({
  selector: 'fast-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public readonly spinner = template;

}
