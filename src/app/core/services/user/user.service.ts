import { IUser } from '../../models/user.model';
import { AbstractService } from './../../../features/shared/abstracts/service.abstract';
import { IUserToken } from './../../interfaces/user-token.interface';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class UserService extends AbstractService<IUser> {

  protected endpont = '/user';

  public login(body): Observable<IUserToken> {
    this.urlSuffix = '/login'
    return this.post(body).pipe(map(data => data.body), tap((userToken: any): void => {
      console.log(userToken);

      localStorage.setItem('user', userToken.user);
      localStorage.setItem('token', userToken.token);
      localStorage.setItem('id', userToken.id);
      this.urlSuffix = '';
    })) as Observable<IUserToken>
  }

}
