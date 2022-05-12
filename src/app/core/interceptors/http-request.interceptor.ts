import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, filter, Observable, of, tap } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class HttpRequestInterceptor implements HttpInterceptor {

  constructor(private readonly toastr: ToastrService) {}
  public intercept(requisition: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(requisition).pipe(catchError((error): Observable<any> => {
      this.toastr.error(error.error?.title, error.error?.message);
      console.error(error)
      return of(error)
    }), filter((response) => response instanceof HttpResponse), tap((response: HttpResponse<any>): void => {
      this.toastr.success(response.body.title, response.body?.message)
    }))
  }

}
