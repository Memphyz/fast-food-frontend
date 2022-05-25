import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UnspashService {

  constructor(private readonly httpClient: HttpClient) {}

  public findImageUrl(query: string, page) {
    return this.httpClient.get('https://api.unsplash.com/search/photos', {
      params: {
        per_page: 10,
        client_id: 'pbnasjmxAlJuahnQMl2Wlh06hNywuOTKlrZgRCr9TeA',
        client_secret: 'ROHMIEaHvUBKFe-Xkpbu94X7ig64ug0RbhtjxqNJAb0',
        query,
        page: page
      }
    }).pipe(map((result: any) => result.results))
  }
}
