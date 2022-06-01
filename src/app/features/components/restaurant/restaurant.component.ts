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

@Component({
  selector: 'fast-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.scss']
})
export class RestaurantComponent implements OnInit {

  public restaurant: Restaurant;

  constructor(private readonly route: ActivatedRoute, private readonly restaurantService: RestaurantService, private readonly modalService: BsModalService) {}

  public ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.restaurantService.findById(id).subscribe({
      next: (restaurant) => {
        this.restaurant = restaurant;
        console.log(restaurant);


      }
    })
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
