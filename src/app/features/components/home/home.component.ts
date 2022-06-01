import { Restaurant } from './../../../core/interfaces/restaurant.interface';
import {
  RestaurantService
} from './../../../core/services/restaurant/restaurant.service';
import { UserService } from './../../../core/services/user/user.service';
import { Component, OnInit } from '@angular/core';
import { UnspashService } from 'src/app/core/services/unsplash/unsplash.service';

@Component({
  selector: 'fast-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public restaurants: Restaurant[] = [];
  public page = 0;

  constructor(private readonly restaurantService: RestaurantService, private readonly userService: UserService, private readonly unspashService: UnspashService) {}

  public ngOnInit(): void {
    this.fetch();

  }

  public scroll() {
    this.page++;
    this.fetch();
  }

  private fetch(): void {
    this.restaurantService.findAll({ page: this.page, limit: 10 }).subscribe({
      next: (restaurants) => {
        this.restaurants.push(...restaurants);
      }
    })
  }

}
