import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({ providedIn: 'root' })
export class LoginGuard implements CanActivate {

  constructor(private readonly toastr: ToastrService) {}
  public canActivate(): boolean {
    if (localStorage.getItem('user') && localStorage.getItem('token')) {
      this.toastr.error('Para acessar a tela de login, deslogue-se primeiro', 'Você já está logado');
      return false;
    }
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    return true;
  }

}
