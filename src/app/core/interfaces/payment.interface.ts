export interface IPayment {
  name: string;
  type: PaymentTypes,
  icon: string;
  color: string;
}

export type PaymentTypes = 'CASH' | 'CREDIT_CARD' | 'DEBIT_CARD' | 'CHECK' | 'PIX'
