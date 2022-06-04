import { User } from '../../models/user.model';
import { AbstractService } from './../../../features/shared/abstracts/service.abstract';
import { UserToken } from './../../interfaces/user-token.interface';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class UserService extends AbstractService<User> {

  protected endpont = '/user';

  public login(body): Observable<UserToken> {
    this.urlSuffix = '/login'
    return this.post(body).pipe(tap((userToken: any): void => {
      localStorage.setItem('user', userToken.user);
      localStorage.setItem('token', userToken.token);
      localStorage.setItem('id', userToken.id);
      this.urlSuffix = '';
    })) as Observable<UserToken>
  }

}
