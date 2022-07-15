import { IProduct } from '../../interfaces/product.interface';
import { Injectable } from '@angular/core';
import { AbstractService } from 'src/app/features/shared/abstracts/service.abstract';


@Injectable({ providedIn: 'root' })
export class ProductService extends AbstractService<IProduct> {

  protected endpont: string = '/product';

  constructor() {
    super();
  }
}
