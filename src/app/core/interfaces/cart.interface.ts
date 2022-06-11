import { Product } from './product.interface';

export interface ICart {
  products: Product[];
  total: number;
}
