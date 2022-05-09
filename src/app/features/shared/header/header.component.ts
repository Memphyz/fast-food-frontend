import { HeaderButton } from './../../../core/interfaces/header-button.interface';
import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'fast-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {

  public get show(): boolean {
    return window.location.pathname.includes('register') || window.location.pathname.includes('login')
  }

  public mobile = window.innerWidth < 768;

  public get leftButtons(): HeaderButton[] {
    return [
      {
        label: 'Cadastrar',
        routerlink: ['/register'],
        class: 'outline'
      },
      {
        label: 'Entrar',
        routerlink: ['/login']
      }
    ]
  }

  @HostListener('window:resize')
  public resize(): void {
    this.mobile = window.innerWidth < 768;
  }
}
