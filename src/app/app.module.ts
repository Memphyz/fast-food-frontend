import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpRequestInterceptor } from './core/interceptors/http-request.interceptor';
import { ComponentsModule } from './features/components/components.module';
import { SharedModule } from './features/shared/shared.module';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { Injector, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MdbAccordionModule } from 'mdb-angular-ui-kit/accordion';
import { MdbCarouselModule } from 'mdb-angular-ui-kit/carousel';
import { MdbCheckboxModule } from 'mdb-angular-ui-kit/checkbox';
import { MdbCollapseModule } from 'mdb-angular-ui-kit/collapse';
import { MdbDropdownModule } from 'mdb-angular-ui-kit/dropdown';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { MdbModalModule } from 'mdb-angular-ui-kit/modal';
import { MdbPopoverModule } from 'mdb-angular-ui-kit/popover';
import { MdbRadioModule } from 'mdb-angular-ui-kit/radio';
import { MdbRangeModule } from 'mdb-angular-ui-kit/range';
import { MdbRippleModule } from 'mdb-angular-ui-kit/ripple';
import { MdbScrollspyModule } from 'mdb-angular-ui-kit/scrollspy';
import { MdbTabsModule } from 'mdb-angular-ui-kit/tabs';
import { MdbTooltipModule } from 'mdb-angular-ui-kit/tooltip';
import { MdbValidationModule } from 'mdb-angular-ui-kit/validation';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { BsModalService, ModalModule } from 'ngx-bootstrap/modal';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ToastrModule, ToastrService } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CommonModule,
    ComponentsModule,
    HttpClientModule,
    SharedModule,
    FormsModule,
    MdbAccordionModule,
    MdbCarouselModule,
    MdbCheckboxModule,
    MdbCollapseModule,
    MdbDropdownModule,
    MdbFormsModule,
    MdbModalModule,
    MdbPopoverModule,
    MdbRadioModule,
    MdbRangeModule,
    NgxSpinnerModule,
    MdbRippleModule,
    InfiniteScrollModule,
    MdbScrollspyModule,
    MdbTabsModule,
    MdbTooltipModule,
    MdbValidationModule,
    ModalModule,
    ReactiveFormsModule,
    NgbModule,
    CurrencyMaskModule,
    ToastrModule.forRoot({
      timeOut: 4000,
      preventDuplicates: true,
      countDuplicates: true,
      includeTitleDuplicates: true,
      progressAnimation: 'decreasing',
      progressBar: true
    })
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: HttpRequestInterceptor,
    multi: true
  }, BsModalService],
  bootstrap: [AppComponent]
})
export class AppModule {

  public static injector: Injector;

  constructor(private readonly injector: Injector, private readonly toastr: ToastrService) {
    AppModule.injector = this.injector;
    window.addEventListener('online', () => this.toastr.success('Não criemos pânico! sua rede internet voltou a funcionar normalmente!', 'Voltamos!'));
    window.addEventListener('offline', () => this.toastr.error('Más noticias, seu navegador desconectou da rede internet, que tal dar uma olhadinha antes de continuar navegando?', 'Desconectado!'));
    (window as any).global = window;
    window.global.Buffer = window.global.Buffer || require('buffer').Buffer;
  }

  public static get<T>(token: T): any {
    return this.injector.get(token) as T;
  }

}
