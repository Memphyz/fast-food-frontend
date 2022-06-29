import { CartComponent } from '../cart/cart.component';
import { AppModule } from './../../../../app.module';
import { HeaderButton } from './../../../../core/interfaces/header-button.interface';
import { Cart } from './../cart/cart';
import { BsModalService } from 'ngx-bootstrap/modal';

export const unloggedHeaderButtons: HeaderButton[] = [
  {
    label: 'Cadastrar',
    routerlink: ['/register'],
    class: 'outline'
  },
  {
    label: 'Entrar',
    routerlink: ['/sign-in']
  }
];

export const loggedHeaderButtons: HeaderButton[] = [
  {
    label: 'Sair',
    onClick: () => { localStorage.removeItem('token'); localStorage.removeItem('user'), localStorage.removeItem('id'); },
    routerlink: ['/home'],
    class: 'outline'
  },
  {
    icon: 'cart',
    badgeCalc: Cart.itemsLengthString,
    onClick: () => {
      const modalService: BsModalService = AppModule.get(BsModalService);
      modalService.show(CartComponent, {
        animated: true,
        backdrop: true,
        class: 'modal-dialog-centered fast-cart justify-content-center',
        ignoreBackdropClick: true
      })
    }
  }
];
