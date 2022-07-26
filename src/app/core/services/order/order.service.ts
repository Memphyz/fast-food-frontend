import { IOrder } from './../../interfaces/order.interface';
import { Injectable } from '@angular/core';
import { AbstractService } from 'src/app/features/shared/abstracts/service.abstract';

@Injectable({ providedIn: 'root' })
export class OrderService extends AbstractService<IOrder> {
  protected endpont = '/order';

}
