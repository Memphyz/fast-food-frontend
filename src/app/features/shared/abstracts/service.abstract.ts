import { AppModule } from './../../../app.module';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


export abstract class AbstractService<Model> {

  protected readonly httpClient = AppModule.injector.get(HttpClient);

  private readonly BASE_URL = 'http://localhost:3000/api/v1';

  protected abstract endpont: string;

  public get<T>(): Observable<T> {
    return this.httpClient.get<T>(this.BASE_URL + this.endpont)
  }

  public findAll(): Observable<Model[]> {
    return this.get();
  }

}
