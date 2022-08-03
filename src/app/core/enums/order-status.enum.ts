export enum OrderStatusType {
  CONFIRM_ORDER = 'Confirmado',
  START_PREPARATION = 'Preparando',
  READY_PICKUP = 'Pronto para retirada',
  DISPATCH = 'Saiu para entrega',
  CANCEL_REQUEST = 'Pedido de cancelamento',
  CANCELLED = 'Pedido cancelado',
  DENY_CANCEL = 'Pedido de cancelamento negado'
}
