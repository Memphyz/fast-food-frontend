import { HeaderButton } from './../../../../core/interfaces/header-button.interface';
import { user } from './../../utils/local-storage';
import { loggedHeaderButtons, unloggedHeaderButtons } from './header';
import { Component, DoCheck, HostListener } from '@angular/core';

@Component({
  selector: 'fast-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements DoCheck {

  public get show(): boolean {
    return window.location.pathname.includes('register')
      || window.location.pathname.includes('sign-in')
      || window.location.pathname.includes('forgot-password');
  }

  public leftButtons: HeaderButton[] = [

  ]

  public mobile = window.innerWidth < 768;

  public ngDoCheck(): void {
    const current = user();
    if (current) {
      this.leftButtons = loggedHeaderButtons;
      return undefined;
    }
    this.leftButtons = unloggedHeaderButtons;
  }

  @HostListener('window:resize')
  public resize(): void {
    this.mobile = window.innerWidth < 768;
  }
}
