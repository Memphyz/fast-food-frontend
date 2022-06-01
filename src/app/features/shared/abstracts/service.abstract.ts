import { AppModule } from './../../../app.module';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';


export abstract class AbstractService<Model> {

  protected readonly httpClient = AppModule.injector.get(HttpClient);

  private readonly BASE_URL = 'http://localhost:3000/api/v1';

  public urlSuffix = '';

  protected abstract endpont: string;

  public get<T>(params?: object): Observable<T> {
    return this.httpClient.get<T>(this.BASE_URL + this.endpont + this.urlSuffix, {
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`
      },
      params: {
        ...params
      }
    })
  }

  public post<T>(body: T): Observable<void> {
    return this.httpClient.post<void>(this.BASE_URL + this.endpont + this.urlSuffix, body, {
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
  }

  public save<T>(body: T): Observable<void> {
    return this.post(body);
  }

  public findById(id: string): Observable<Model> {
    this.urlSuffix = `/${id}`
    return this.get().pipe(tap(this.resetSuffix));
  }

  public findAll(params?: object): Observable<Model[]> {
    this.resetSuffix();
    return this.get(params);
  }

  private resetSuffix(...args): void {
    this.urlSuffix = ''
  }

}
