import { Restaurant } from '../../interfaces/restaurant.interface';
import { Injectable } from '@angular/core';
import { AbstractService } from 'src/app/features/shared/abstracts/service.abstract';

@Injectable({ providedIn: 'root' })
export class RestaurantService extends AbstractService<Restaurant> {

  protected endpont = '/restaurant';

}
