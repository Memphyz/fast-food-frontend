import { OrderStatusType } from '../enums/order-status.enum';
import { PaymentType } from '../enums/payment.enum';
import { IAddress } from './address.interface';
import { IAudit } from './audit.interface';
import { IProduct } from './product.interface';

export interface IOrder extends IAudit {
  started?: Date,
  deliveryTime?: Date,
  ended?: Date,
  user: string,
  id?: string;
  products: IProductOrder[],
  payment: PaymentType,
  address: string,
  number?: number,
  rating?: number,
  overview?: string,
  status?: OrderStatusType
}

export interface IOrderCache {
  started?: Date;
  deliveryTime?: Date;
  ended?: Date;
  user: string;
  id?: string;
  products: IProduct[];
  payment: PaymentType;
  address: IAddress;
  number?: number;
  rating?: number;
  overview?: string;
  status?: OrderStatusType;
  created?: Date;
  updated?: Date;
  createdBy?: string;
  updatedBy?: string;
}

export interface IProductOrder {
  id: string,
  notes?: string
}
