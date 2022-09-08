import { BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { CartComponent } from '../cart/cart.component';
import { AppModule } from './../../../../app.module';
import { IHeaderButton } from './../../../../core/interfaces/header-button.interface';
import { Cart } from './../cart/cart';

export const unloggedHeaderButtons: IHeaderButton[] = [
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

export const loggedHeaderButtons: IHeaderButton[] = [
  {
    icon: 'home',
    class: 'outline',
    label: 'Home',
    iconColor: 'var(--bs-gray-600)',
    routerlink: ['/home']
  },
  {
    icon: 'restaurant',
    label: 'Restaurante',
    iconColor: 'white',
    dropdown: [
      {
        label: 'Cadastrar',
        icon: 'plus_outline',
        routerlink: ['/restaurant', 'register'],
        iconColor: 'var(--bs-gray-600)',
        class: 'outline'
      },
      {
        label: 'Gerênciar',
        icon: 'config',
        routerlink: ['/restaurant', 'manager'],
        iconColor: 'var(--bs-gray-600)',
        class: 'outline'
      }
    ]
  },
  {
    icon: 'cart',
    label: 'Carrinho',
    badgeCalc: Cart.itemsLengthString,
    onClick: () => {
      const modalService: BsModalService = AppModule.get(BsModalService);
      if (Cart.cart()?.products) {
        modalService.show(CartComponent, {
          animated: true,
          backdrop: true,
          class: 'modal-dialog-centered fast-cart justify-content-center',
          ignoreBackdropClick: true
        });
        return undefined;
      }
      const alert: ToastrService = AppModule.get(ToastrService);
      alert.info('Seu carrinho está vazio!', 'Ops!')
    }
  },
  {
    icon: 'profile',
    label: 'Perfil',
    dropdown: [
      {
        label: 'Sair',
        onClick: () => { localStorage.removeItem('token'); localStorage.removeItem('user'), localStorage.removeItem('id'); },
        routerlink: ['/home'],
        icon: 'logout',
        iconColor: 'var(--bs-gray-600)',
        class: 'outline'
      },
      {
        label: 'Pedidos',
        icon: 'order',
        routerlink: ['/orders'],
        iconColor: 'var(--bs-gray-600)',
        class: 'outline'
      },
      {
        label: 'Endereços',
        icon: 'location',
        routerlink: ['/address'],
        iconColor: 'var(--bs-gray-600)',
        class: 'outline'
      }
    ]
  },
];
