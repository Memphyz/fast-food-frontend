import { Restaurant } from './../../../../core/interfaces/restaurant.interface';
import { User } from './../../../../core/models/user.model';
import { UserService } from './../../../../core/services/user/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'fast-restaurant-details-modal',
  templateUrl: './restaurant-details-modal.component.html',
  styleUrls: ['./restaurant-details-modal.component.scss']
})
export class RestaurantDetailsModalComponent implements OnInit {

  public readonly restaurant: Restaurant;
  public readonly owners: User[] = [];

  constructor(private readonly userService: UserService) {}

  public ngOnInit(): void {
    this.userService.findAll({ ids: this.restaurant.owners, anon: true }).subscribe((users) => this.owners.push(...users))
  }
}
