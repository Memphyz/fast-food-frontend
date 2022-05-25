import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { catchError, filter, Observable, of, tap } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class HttpRequestInterceptor implements HttpInterceptor {

  constructor(private readonly toastr: ToastrService, private readonly spinner: NgxSpinnerService) {}
  public intercept(requisition: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.spinner.show();
    return next.handle(requisition).pipe(catchError((error): Observable<any> => {
      if (!error.status) {
        this.spinner.hide();
        this.toastr.error('Houve um problema durante a tentativa de entrar em contato com o servidor', 'Tente novamente mais tarde');
        console.error(error);
        return of(error);
      }
      this.spinner.hide();
      this.toastr.error(error.error?.message, error.error?.title);
      console.error(error);
      return of(error)
    }), filter((response) => response instanceof HttpResponse), tap((response: HttpResponse<any>): void => {
      this.spinner.hide();
      (response.body?.message || response.body?.title) && this.toastr.success(response.body?.message, response.body?.title)
    }))
  }

}
