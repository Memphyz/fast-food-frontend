import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { AppModule } from './../../../app.module';


export abstract class AbstractService<Model> {

  protected readonly httpClient = AppModule.injector.get(HttpClient);


  private readonly BASE_URL = 'http://localhost:3000/api/v1';

  public urlSuffix = '';

  protected abstract endpont: string;
  private many: boolean;

  public get<T>(params?: object): Observable<T> {
    return this.httpClient.get<T>(this.BASE_URL + this.endpont + this.urlSuffix, {
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`
      },
      params: {
        ...params,
      },
    })
  }

  public getResponse<T>(params?: object): Observable<HttpResponse<T>> {
    return this.httpClient.get<T>(this.BASE_URL + this.endpont + this.urlSuffix, {
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`
      },
      params: {
        ...params,
      },
      observe: 'response'
    })
  }

  public post<T>(body: T): Observable<HttpResponse<T>> {
    return this.httpClient.post<any>(this.BASE_URL + this.endpont + this.urlSuffix, body, {
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`
      },
      observe: 'response'
    });
  }
  public path<T>(body: T): Observable<HttpResponse<T>> {
    return this.httpClient.patch<any>(this.BASE_URL + this.endpont + this.urlSuffix, body, {
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`
      },
      observe: 'response'
    });
  }

  public save<T>(body: T): Observable<HttpResponse<T>> {
    return this.post(body);
  }

  public update<T>(body: T): Observable<HttpResponse<T>> {
    return this.path(body);
  }

  public saveAll<T>(body: T): Observable<HttpResponse<T>> {
    this.resetSuffix();
    this.endpont += 's';
    this.many = true;
    return this.post(body);
  }

  public updateAll<T>(body: T): Observable<HttpResponse<T>> {
    this.resetSuffix();
    this.endpont += 's';
    this.many = true;
    return this.path(body);
  }

  public findById(id: string): Observable<Model> {
    this.urlSuffix = `/${id}`
    return this.get().pipe(tap(this.resetSuffix));
  }

  public findAll(params?: object, response?: boolean): Observable<Model[]> {
    params = this.removeNullableParams(params);
    this.resetSuffix();
    return this.get(params);
  }

  public findAllResponse(params?: object, response?: boolean): Observable<HttpResponse<Model[]>> {
    this.resetSuffix();
    return this.getResponse(params);
  }

  public findManyById(params: ({ [key: string]: any } & { ids: any })): Observable<Model[]> {
    this.resetSuffix();
    this.endpont += 's';
    this.many = true;
    return this.get(params);
  }

  public findAllById(params: ({ [key: string]: any } & { id: any })): Observable<Model[]> {
    this.resetSuffix();
    this.urlSuffix = `/${params.id}`;
    return this.get(params);
  }

  public findAllByIdCustomSuffix(params: ({ [key: string]: any } & { id: any }), urlSuffix: string): Observable<Model[]> {
    this.resetSuffix();
    this.urlSuffix = urlSuffix;
    return this.get(params);
  }

  private resetSuffix(...args): void {
    this.many && this.endpont && this.endpont[this.endpont.length - 1] === 's' && (this.endpont = this.endpont.substring(0, this.endpont.length - 1));
    this.urlSuffix = ''
  }

  private removeNullableParams(object: { [x: string]: any }): { [x: string]: any } {
    const params = {};
    Object.entries(object || {}).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        params[key] = value;
      }
    });
    return params
  }

}
