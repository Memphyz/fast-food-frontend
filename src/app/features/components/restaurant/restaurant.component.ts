import { skeleton } from '../../shared/utils/skeleton';
import { Restaurant } from './../../../core/interfaces/restaurant.interface';
import {
  RestaurantService
} from './../../../core/services/restaurant/restaurant.service';
import {
  RestaurantDetailsModalComponent
} from './restaurant-details-modal/restaurant-details-modal.component';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { mergeMap, Observable, tap } from 'rxjs';
import { Product } from 'src/app/core/interfaces/product.interface';
import { ProductService } from 'src/app/core/services/product/product.service';

@Component({
  selector: 'fast-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.scss']
})
export class RestaurantComponent implements OnInit {

  public restaurant: Restaurant;
  public products: Product[];
  public skeletons = skeleton(18)

  constructor(private readonly route: ActivatedRoute, private readonly restaurantService: RestaurantService, private readonly produtoService: ProductService, private readonly modalService: BsModalService) {}

  public ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.restaurantService.findById(id).pipe(tap((restaurant) => this.restaurant = restaurant), mergeMap((restaurant): Observable<Product[]> => this.produtoService.findAllById({ id: restaurant.id }))).subscribe((products) => this.products = products)
  }

  public btnInfo() {
    const config: ModalOptions<RestaurantDetailsModalComponent> = {
      class: 'modal-dialog-centered sm',
      initialState: {
        restaurant: this.restaurant
      }
    }
    this.modalService.show(RestaurantDetailsModalComponent, config)
  }

}
