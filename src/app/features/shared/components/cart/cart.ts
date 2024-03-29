import { ICart } from './../../../../core/interfaces/cart.interface';
import { cloneDeep } from 'lodash';
import { IProduct } from 'src/app/core/interfaces/product.interface';

export class Cart {

  public static add(product: IProduct, total: number): void {
    const cart: ICart = sessionStorage.getItem('cart') ? JSON.parse(window.atob(sessionStorage.getItem('cart'))) : { products: [], total: 0 };
    if (!cart) {
      return undefined;
    }
    const productCopy = cloneDeep(product)
    productCopy.additionals = productCopy.additionals.filter((addictional): boolean => addictional.quantity > 0)
    cart.products = [...(cart?.products || []), productCopy];
    cart.total = Cart.total(cart.products);

    sessionStorage.setItem('cart', window.btoa(JSON.stringify(cart)));
  }

  public static itemsLengthString(): string {
    const cart: ICart = JSON.parse(sessionStorage.getItem('cart') ? window.atob(sessionStorage.getItem('cart')) : '{}');
    return `"${(cart?.products?.length || '').toString()}"`;
  }

  public static clear(): void {
    sessionStorage.removeItem('cart')
  }

  public static total(products: IProduct[]): number {
    return products?.map((product) => product.price + product.additionals.map(addictional => addictional.total)?.reduce((acumulator, value) => acumulator + value, 0)).reduce((acumulator, total) => acumulator + total, 0)
  }

  public static cart(): ICart {
    const cart: ICart = JSON.parse(sessionStorage.getItem('cart') ? window.atob(sessionStorage.getItem('cart')) : '{}');
    return cart;
  }
}
