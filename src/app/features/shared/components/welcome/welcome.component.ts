import { Component } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'fast-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent {

  constructor(public readonly modalRef: BsModalRef) {}

  public get localStorage(): Storage {
    return localStorage
  }

}
