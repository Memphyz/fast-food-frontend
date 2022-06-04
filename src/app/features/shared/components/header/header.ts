import { HeaderButton } from './../../../../core/interfaces/header-button.interface';

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
  }
];
