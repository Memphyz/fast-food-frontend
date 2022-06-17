import { ICart } from './../../../../core/interfaces/cart.interface';
import { cloneDeep } from 'lodash';
import { Product } from 'src/app/core/interfaces/product.interface';

export class Cart {

  public static add(product: Product, total: number): void {
    const cart: ICart = JSON.parse(sessionStorage.getItem('cart')) || { products: [], total: 0 };
    const productCopy = cloneDeep(product)
    productCopy.additionals = productCopy.additionals.filter((addictional): boolean => addictional.quantity > 0)
    cart.products.push(productCopy);
    cart.total += total;
    sessionStorage.setItem('cart', JSON.stringify(cart));
  }

  public static itemsLengthString(): string {
    const cart: ICart = JSON.parse(sessionStorage.getItem('cart'));
    return `"${(cart?.products?.length || '').toString()}"`;
  }

  public static cart(): ICart {
    const cart: ICart = JSON.parse(sessionStorage.getItem('cart'));
    return cart;
  }
}
