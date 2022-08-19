import { PaymentType } from '../enums/payment.enum';

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
  address: string;
  active: boolean;
  photo: string;
  open: string;
  close: string;
  payments: PaymentType[];
  owners: string[];
  products: any[];
}
