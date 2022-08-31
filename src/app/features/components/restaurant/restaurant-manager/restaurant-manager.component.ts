import { IRestaurant } from './../../../../core/interfaces/restaurant.interface';
import {
  RestaurantService
} from './../../../../core/services/restaurant/restaurant.service';
import { userId } from './../../../shared/utils/local-storage';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'fast-restaurant-manager',
  templateUrl: './restaurant-manager.component.html',
  styleUrls: ['./restaurant-manager.component.scss']
})
export class RestaurantManagerComponent implements OnInit {

  public restaurants: IRestaurant[] = [];

  constructor(private readonly restaurantResvice: RestaurantService) {}

  public ngOnInit(): void {
    this.fetch();
  }

  public fetch(): void {
    this.restaurantResvice.findAll({ id: userId() }).subscribe((restaurants) => this.restaurants.push(...restaurants))
  }

}
