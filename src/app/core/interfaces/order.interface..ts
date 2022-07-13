import { PaymentTypes } from './payment.interface';

export interface Order {
  started: Date,
  deliveryTime: Date,
  ended: Date,
  user: string,
  products: { id: string, notes: string }[],
  payment: PaymentTypes,
  address: Object,
  rating: Number,
  overview: String,
  status: 'CONFIRM_ORDER' | 'START_PREPARATION' | 'READY_PICKUP' | 'DISPATCH' | 'CANCEL_REQUEST' | 'CANCELLED' | 'DENY_CANCEL',
}
