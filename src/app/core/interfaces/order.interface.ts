import { IAddress } from './address.interface';
import { PaymentTypes } from './payment.interface';

export interface IOrder {
  started?: Date,
  deliveryTime?: Date,
  ended?: Date,
  user: string,
  products: IProductOrder[],
  payment: PaymentTypes,
  address: IAddress,
  rating?: number,
  overview?: string,
  status?: 'CONFIRM_ORDER' | 'START_PREPARATION' | 'READY_PICKUP' | 'DISPATCH' | 'CANCEL_REQUEST' | 'CANCELLED' | 'DENY_CANCEL'
}

export interface IProductOrder {
  id: string,
  notes?: string
}
