import { User } from '../../models/user.model';
import { AbstractService } from './../../../features/shared/abstracts/service.abstract';
import { Injectable } from '@angular/core';


@Injectable({ providedIn: 'root' })
export class UserService extends AbstractService<User> {

  protected endpont = '/user';

}
