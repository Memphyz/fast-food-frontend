import { IProduct } from './product.interface';

export interface ICart {
  products: IProduct[];
  total: number;
}
