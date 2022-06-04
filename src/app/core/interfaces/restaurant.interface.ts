import { Payments } from '../enums/payment.enum';

export interface Address {
  postalCode: string;
  street: string;
  number: number;
  neighborhood: string;
  city: string;
  state: string;
  complement?: string;
  reference?: any;
  district: string;
}

export interface Product {
  name: string,
  description: string,
  price: number,
  active: boolean,
  payment: Payments[],
  restaurant: string,
  client: string,
  additionals: Additional,
}

export interface Additional {
  unitPrice: number,
  total: number,
  description: string,
  quantity: number,
  name: string,
  notes: string
}

export interface Restaurant {
  name: string;
  freight: number;
  id: string;
  rate: number;
  kitchen: string;
  address: Address;
  active: boolean;
  photo: string;
  open: string;
  close: string;
  payments: Payments[];
  owners: string[];
  products: any[];
}
