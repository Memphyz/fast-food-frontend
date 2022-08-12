import { ICart } from './../../../../core/interfaces/cart.interface';
import { cloneDeep } from 'lodash';
import { IProduct } from 'src/app/core/interfaces/product.interface';

export class Cart {

  public static add(product: IProduct, total: number): void {
    const cart: ICart = JSON.parse(sessionStorage.getItem('cart')) || { products: [], total: 0 };
    if (!cart) {
      return undefined;
    }
    const productCopy = cloneDeep(product)
    productCopy.additionals = productCopy.additionals.filter((addictional): boolean => addictional.quantity > 0)
    cart.products = [...(cart?.products || []), productCopy];
    cart.total = Cart.total(cart.products);

    sessionStorage.setItem('cart', JSON.stringify(cart));
  }

  public static itemsLengthString(): string {
    const cart: ICart = JSON.parse(sessionStorage.getItem('cart') || '{}');
    return `"${(cart?.products?.length || '').toString()}"`;
  }

  public static clear(): void {
    sessionStorage.setItem('cart', null);
  }

  public static total(products: IProduct[]): number {
    console.log(products);

    return products?.map((product) => product.price + product.additionals.map(addictional => addictional.total)?.reduce((acumulator, value) => acumulator + value, 0)).reduce((acumulator, total) => acumulator + total, 0)
  }

  public static cart(): ICart {
    const cart: ICart = JSON.parse(sessionStorage.getItem('cart') || '{}');
    return cart;
  }
}
