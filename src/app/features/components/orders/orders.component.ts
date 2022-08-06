import { OrderStatusType } from './../../../core/enums/order-status.enum';
import { PaymentNameType, PaymentType } from './../../../core/enums/payment.enum';
import { IOrder } from './../../../core/interfaces/order.interface';
import { AddressService } from './../../../core/services/address/address.service';
import { OrderService } from './../../../core/services/order/order.service';
import {
  RestaurantService
} from './../../../core/services/restaurant/restaurant.service';
import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs';
import { ProductService } from 'src/app/core/services/product/product.service';

@Component({
  selector: 'fast-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  public readonly orders: IOrder[] = [];
  public readonly orderCache = {};
  public searched: boolean;
  public readonly skeletonSize = Array(5).fill(1);

  constructor(private readonly orderService: OrderService,
    private readonly productService: ProductService,
    private readonly addressService: AddressService,
    private readonly restaurantService: RestaurantService) {}

  public ngOnInit(): void {
    this.fetch();
  }

  public fetch(): void {
    this.searched = false;
    this.orderService.findAll().pipe(finalize(() => this.searched = true)).subscribe((orders) => this.orders.push(...orders));
  }

  public detail(order: IOrder): void {
    if (!this.orderCache[order.id]) {
      console.log(order);

      this.addressService.findById(order.address).pipe().subscribe(console.log)
    }

  }

  public paymentType(type: PaymentType): string {
    return PaymentNameType[type];
  }

  public orderStatus(status: OrderStatusType): string {
    return OrderStatusType[status]
  }

}
