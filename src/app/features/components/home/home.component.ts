import { Restaurant } from './../../../core/interfaces/restaurant.interface';
import {
  RestaurantService
} from './../../../core/services/restaurant/restaurant.service';
import { Component, OnInit } from '@angular/core';
import faker from '@faker-js/faker';
import { random } from 'lodash';
import { Product } from 'src/app/core/interfaces/product.interface';
import { UnspashService } from 'src/app/core/services/unsplash/unsplash.service';

const PRODUCT_SIZE_PER_RESTAURANT = 1;

@Component({
  selector: 'fast-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public restaurants: Restaurant[] = [];
  public page = 0;

  constructor(private readonly restaurantService: RestaurantService, private readonly unspashService: UnspashService) {}

  public ngOnInit(): void {
    /** @type {*} */
    this.restaurantService.findAll({ page: 0, limit: 10000 }).subscribe({
      next: (restaurants) => {
        const products: Product[] = [];
        restaurants.forEach(async restaurant => {
          for (let index = 0; index < PRODUCT_SIZE_PER_RESTAURANT; index++) {
            let page = 0;
            let aux = 0;
            let images = await this.unspashService.findImageUrl('food hamburguer', page).toPromise()
            const product: Product = {
              name: faker.commerce.productName(),
              description: faker.commerce.productDescription(),
              image: images[random(0, images.length - 1)].urls.regular,
              active: faker.random.boolean(),
              price: +(+faker.random.numeric(2, { allowLeadingZeros: true }) / 3).toString().substring(0, 4),
              restaurant: restaurant.id,
              client: restaurant.owners[0],
              additionals: null
            }
            if (aux === 10) {
              aux = 0;
              page++
              images = await this.unspashService.findImageUrl('food', page).toPromise()
            }
            products.push(product)
          }
          console.log(products);
        })

      }
    })
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
