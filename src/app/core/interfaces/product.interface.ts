import { Additional } from './restaurant.interface';

export interface Product {
  name: string,
  description: string,
  price: number,
  active: boolean,
  image: string,
  restaurant: string,
  client: string,
  additionals: Additional[],
}
