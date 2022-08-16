import { IRestaurant } from './../../../core/interfaces/restaurant.interface';
import {
  RestaurantService
} from './../../../core/services/restaurant/restaurant.service';
import { Component, OnInit } from '@angular/core';

const PRODUCT_SIZE_PER_RESTAURANT = 60;
const ADDITIONAL_SIZE_PER_PRODUCT = 10;

@Component({
  selector: 'fast-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public restaurants: IRestaurant[] = [];
  public page = 0;
  public search: string;

  constructor(private readonly restaurantService: RestaurantService) {}

  public ngOnInit(): void {
    this.fetch();
  }

  public scroll() {
    this.page++;
    this.fetch();
  }

  public find(search: string): void {
    this.search = search;
    this.restaurants = [];
    this.fetch();
  }

  private fetch(): void {
    this.restaurantService.findAll({ page: this.page, limit: 10, sort: '-active', search: this.search || '' }).subscribe({
      next: (restaurants) => {
        this.restaurants.push(...restaurants);
      }
    })
  }

}
