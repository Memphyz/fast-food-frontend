import { IAdditional } from './restaurant.interface';

export interface IProduct {
  id?: string,
  name: string,
  description: string,
  price: number,
  active: boolean,
  image: string,
  restaurant: string,
  client: string,
  notes?: string,
  additionals: IAdditional[],
}
