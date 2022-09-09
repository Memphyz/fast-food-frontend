import { WelcomeComponent } from './features/shared/components/welcome/welcome.component';
import { template } from './features/shared/spinner';
import { Component, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'fast-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public readonly spinner = template;

  constructor(private readonly modalService: BsModalService) {}

  public ngOnInit(): void {
    localStorage.getItem('welcome') !== 'true' && this.modalService.show(WelcomeComponent, {
      class: 'modal-dialog-centered',
      backdrop: true,
      animated: true,
      ignoreBackdropClick: true
    })
  }

}
