export interface Payment {
  name: string;
  type: 'CASH' | 'CREDIT_CARD' | 'DEBIT_CARD' | 'CHECK' | 'PIX',
  icon: string;
  color: string;
}
