import { OrderStatusType } from '../enums/order-status.enum';
import { PaymentType } from '../enums/payment.enum';
import { IAddress } from './address.interface';
import { IAudit } from './audit.interface';

export interface IOrder extends IAudit {
  started?: Date,
  deliveryTime?: Date,
  ended?: Date,
  user: string,
  products: IProductOrder[],
  payment: PaymentType,
  address: IAddress,
  number?: number,
  rating?: number,
  overview?: string,
  status?: OrderStatusType
}

export interface IProductOrder {
  id: string,
  notes?: string
}
