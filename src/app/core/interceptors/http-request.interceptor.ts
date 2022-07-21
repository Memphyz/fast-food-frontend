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
import { catchError, filter, Observable, of, tap, throwError } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class HttpRequestInterceptor implements HttpInterceptor {

  constructor(private readonly toastr: ToastrService, private readonly spinner: NgxSpinnerService) {}
  public intercept(requisition: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.spinner.show();
    return next.handle(requisition).pipe(catchError((error): Observable<any> => {
      if (!error.status) {
        this.spinner.hide();
        const msg = window.navigator.onLine ? 'Houve um problema durante a tentativa de entrar em contato com o servidor' : 'Aparentemente você está sem conexão com a internet';
        const title = window.navigator.onLine ? 'Tente novamente mais tarde' : 'Verifique sua conexão com a internet';
        this.toastr.error(msg, title);
        console.error(error);
        return of(error);
      }
      this.spinner.hide();
      this.toastr.error(error.error?.message, error.error?.title);
      console.error(error);
      return throwError(error)
    }), filter((response) => response instanceof HttpResponse), tap((response: HttpResponse<any>): void => {
      this.spinner.hide();
      (response.body?.message || response.body?.title) && this.toastr.success(response.body?.message, response.body?.title)
    }))
  }

}
