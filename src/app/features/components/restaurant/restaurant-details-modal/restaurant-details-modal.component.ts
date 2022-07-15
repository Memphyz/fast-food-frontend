import { IRestaurant } from './../../../../core/interfaces/restaurant.interface';
import { IUser } from './../../../../core/models/user.model';
import { UserService } from './../../../../core/services/user/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'fast-restaurant-details-modal',
  templateUrl: './restaurant-details-modal.component.html',
  styleUrls: ['./restaurant-details-modal.component.scss']
})
export class RestaurantDetailsModalComponent implements OnInit {

  public readonly restaurant: IRestaurant;
  public readonly owners: IUser[] = [];

  constructor(private readonly userService: UserService) {}

  public ngOnInit(): void {
    this.userService.findAll({ ids: this.restaurant.owners, anon: true }).subscribe((users) => this.owners.push(...users))
  }
}
