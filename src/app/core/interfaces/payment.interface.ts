import { PaymentType } from '../enums/payment.enum';

export interface IPayment {
  name: string;
  type: PaymentType,
  icon: string;
  color: string;
}

