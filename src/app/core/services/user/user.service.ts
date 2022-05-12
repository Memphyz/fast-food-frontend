import { User } from '../../models/user.model';
import { AbstractService } from './../../../features/shared/abstracts/service.abstract';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class UserService extends AbstractService<User> {

  protected endpont = '/user';

  public login(body) {
    this.urlSuffix = '/login'
    return this.post(body).pipe(tap(() => this.urlSuffix = ''))
  }

}
