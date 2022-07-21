import { IAddress } from './../../interfaces/address.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

//DOC: https://docs.awesomeapi.com.br/api-cep
@Injectable({ providedIn: 'root' })
export class CepService {

  private readonly URL = 'https://cep.awesomeapi.com.br/json'

  constructor(private readonly httpClient: HttpClient) {}

  public findCep(cep: string): Observable<IAddress> {
    return this.httpClient.get(`${this.URL}/${cep}`).pipe(map((address: any) => address && {
      postalCode: address.cep,
      address: address.address,
      state: address.state,
      district: address.district
    } as IAddress))
  }

}
