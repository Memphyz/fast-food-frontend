import { OrderStatusType } from './../../../core/enums/order-status.enum';
import { PaymentNameType, PaymentType } from './../../../core/enums/payment.enum';
import { IOrder } from './../../../core/interfaces/order.interface';
import { OrderService } from './../../../core/services/order/order.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'fast-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  public readonly orders: IOrder[] = []

  constructor(private readonly orderService: OrderService) {}

  public ngOnInit(): void {
    this.orderService.findAll().subscribe((orders) => this.orders.push(...orders));
  }

  public paymentType(type: PaymentType): string {
    return PaymentNameType[type];
  }

  public orderStatus(status: OrderStatusType): string {
    return OrderStatusType[status]
  }

}
