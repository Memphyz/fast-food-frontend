import { OrderStatusType } from './../../../core/enums/order-status.enum';
import { PaymentNameType, PaymentType } from './../../../core/enums/payment.enum';
import { IOrderView } from './../../../core/interfaces/order.interface';
import { IProduct } from './../../../core/interfaces/product.interface';
import { IAdditional } from './../../../core/interfaces/restaurant.interface';
import { AddressService } from './../../../core/services/address/address.service';
import { OrderService } from './../../../core/services/order/order.service';
import {
  RestaurantService
} from './../../../core/services/restaurant/restaurant.service';
import { Cart } from './../../shared/components/cart/cart';
import { Component, OnInit } from '@angular/core';
import { finalize, mergeMap, tap } from 'rxjs';
import { ProductService } from 'src/app/core/services/product/product.service';

@Component({
  selector: 'fast-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  public readonly orders: IOrderView[] = [];
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

  public detail(order: IOrderView): void {
    if (!order.cache) {
      console.log(order);

      order.cache = {}
      this.addressService.findById(order.address).pipe(
        tap((address) => order.cache.address = address),
        mergeMap(() => this.productService.findManyById({ ids: order.products.map((product) => product.id) })),
        tap((products) => order.cache.products = products),
        tap(console.log),
        mergeMap(() => this.restaurantService.findManyById({ ids: order.cache.products.map((product) => product.restaurant) }))).subscribe((restaurants) => order.cache.restaurants = restaurants)
    }
  }

  public paymentType(type: PaymentType): string {
    return PaymentNameType[type];
  }

  public total(products: IProduct[]): number {
    return Cart.total(products);
  }

  public productNote(id: string, order: IOrderView): string {
    return order.products.find((product) => product.id === id)?.notes;
  }

  public addictionals(id: string, order: IOrderView): IAdditional[] {
    return order.products.find((product) => product.id === id)?.addictionals;
  }

  public orderStatus(status: OrderStatusType): string {
    return OrderStatusType[status]
  }

}