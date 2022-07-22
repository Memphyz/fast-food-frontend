import { IAddress } from './../../interfaces/address.interface';
import { Injectable } from '@angular/core';
import { AbstractService } from 'src/app/features/shared/abstracts/service.abstract';

@Injectable({ providedIn: 'root' })
export class AddressService extends AbstractService<IAddress> {

  protected endpont = '/address';

  constructor() {
    super();
  }
}
