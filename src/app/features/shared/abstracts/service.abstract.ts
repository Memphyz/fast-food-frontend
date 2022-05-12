import { AppModule } from './../../../app.module';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


export abstract class AbstractService<Model> {

  protected readonly httpClient = AppModule.injector.get(HttpClient);

  private readonly BASE_URL = 'http://localhost:3000/api/v1';

  public urlSuffix = '';

  protected abstract endpont: string;

  public get<T>(): Observable<T> {
    return this.httpClient.get<T>(this.BASE_URL + this.endpont + this.urlSuffix)
  }

  public post<T>(body: T): Observable<void> {
    return this.httpClient.post<void>(this.BASE_URL + this.endpont + this.urlSuffix, body);
  }

  public save<T>(body: T): Observable<void> {
    return this.post(body);
  }

  public findAll(): Observable<Model[]> {
    return this.get();
  }

}
