import * as CryptoJs from 'crypto-js';
import { User } from 'src/app/core/models/user.model';

export const user = (): User => localStorage.getItem('user') && localStorage.getItem('id') && JSON.parse(CryptoJs.AES.decrypt(localStorage.getItem('user'), localStorage.getItem('id')).toString(CryptoJs.enc.Utf8))
