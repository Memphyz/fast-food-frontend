import { Restaurant } from './../../../core/interfaces/restaurant.interface';
import {
  RestaurantService
} from './../../../core/services/restaurant/restaurant.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'fast-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.scss']
})
export class RestaurantComponent implements OnInit {

  public restaurant: Restaurant;

  constructor(private readonly route: ActivatedRoute, private readonly restaurantService: RestaurantService) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.restaurantService.findById(id).subscribe({
      next: (restaurant) => {
        this.restaurant = restaurant;
      }
    })
  }

}
