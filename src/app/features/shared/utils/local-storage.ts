import * as CryptoJs from 'crypto-js';
import { IUser } from 'src/app/core/models/user.model';

export const user = (): IUser => localStorage.getItem('user') && localStorage.getItem('id') && JSON.parse(CryptoJs.AES.decrypt(localStorage.getItem('user'), localStorage.getItem('id')).toString(CryptoJs.enc.Utf8))


export const userId = (): string => {
  return user().id;
}
