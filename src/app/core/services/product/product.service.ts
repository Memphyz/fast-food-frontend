import { Product } from '../../interfaces/product.interface';
import { Injectable } from '@angular/core';
import { AbstractService } from 'src/app/features/shared/abstracts/service.abstract';


@Injectable({ providedIn: 'root' })
export class ProductService extends AbstractService<Product> {

  protected endpont: string = '/product';

  constructor() {
    super();
  }
}
