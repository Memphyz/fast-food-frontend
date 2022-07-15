import { PaymentsType } from '../enums/payment.enum';
import { IAddress } from './address.interface';

export interface IAdditional {
  unitPrice: number,
  total: number,
  description: string,
  quantity: number,
  name: string,
  notes: string
}

export interface IRestaurant {
  name: string;
  freight: number;
  id: string;
  rate: number;
  kitchen: string;
  address: IAddress;
  active: boolean;
  photo: string;
  open: string;
  close: string;
  payments: PaymentsType[];
  owners: string[];
  products: any[];
}
