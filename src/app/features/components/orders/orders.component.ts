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
import { AfterContentChecked, Component, OnInit } from '@angular/core';
import { finalize, map, mergeMap, tap } from 'rxjs';
import { ProductService } from 'src/app/core/services/product/product.service';

const SMALL_MOBILE = 478;
const SIZE = 6;

@Component({
  selector: 'fast-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit, AfterContentChecked {

  public readonly orders: IOrderView[] = [];
  public searched: boolean;
  public readonly skeletonSize = Array(5).fill(1);
  public isSmallMobile = window.innerWidth < SMALL_MOBILE;
  private page = 0;

  constructor(private readonly orderService: OrderService,
    private readonly productService: ProductService,
    private readonly addressService: AddressService,
    private readonly restaurantService: RestaurantService) {}

  public ngOnInit(): void {
    this.searched = false;
    this.fetch();
  }

  public ngAfterContentChecked(): void {
    this.isSmallMobile = window.innerWidth < SMALL_MOBILE;
  }

  public scroll(): void {
    this.page++;
    this.fetch();
  }

  public fetch(): void {
    this.orderService.findAllResponse({ limit: SIZE, page: this.page }).pipe(finalize(() => this.searched = true), map(data => data.body)).subscribe((orders) => {
      this.orders.push(...orders)
    });
  }

  public detail(order: IOrderView): void {
    if (!order.cache) {
      order.cache = {}
      this.addressService.findById(order.address).pipe(
        tap((address) => order.cache.address = address),
        mergeMap(() => this.productService.findManyById({ ids: order.products.map((product) => product.id) })),
        tap((products) => order.cache.products = products),
        tap(console.log),
        mergeMap(() => this.restaurantService.findManyById({ ids: order.cache.products.map((product) => product.restaurant) }))).subscribe({
          next: (restaurants) => order.cache.restaurants = restaurants
        })
    }
  }

  public paymentType(type: PaymentType): string {
    return PaymentNameType[type];
  }

  public total(order: IOrderView, products: IProduct[]): number {
    const productsCopy = products?.map((product): IProduct => {
      return {
        ...product,
        additionals: order.products.find((oproduct) => oproduct.id === product.id).addictionals
      }
    })
    return Cart.total(productsCopy);
  }

  public productTotal(order: IOrderView, product: IProduct): number {
    const addictionals = order.products.find((oproduct) => oproduct.id === product.id).addictionals;
    return product.price + addictionals.map((additional) => additional.total).reduce((acc, current) => { return acc + current }, 0)
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
