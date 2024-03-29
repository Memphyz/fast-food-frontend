import { CartComponent } from './components/cart/cart.component';
import { DatePickerComponent } from './components/date-picker/date-picker.component';
import { FilterComponent } from './components/filter/filter.component';
import { HeaderComponent } from './components/header/header.component';
import { IconComponent } from './components/icon/icon.component';
import {
  ImageUploaderComponent
} from './components/image-uploader/image-uploader.component';
import { InputComponent } from './components/input/input.component';
import {
  MultipleTagsComponent
} from './components/multiple-tags/multiple-tags.component';
import { SelectComponent } from './components/select/select.component';
import { SwitchComponent } from './components/switch/switch.component';
import { CollapseDirective } from './directives/collapse.directive';
import { ErrorMessageDirective } from './directives/error-message.directive';
import { FastClickOutsideDirective } from './directives/fast-click-outside.directive';
import { SafePipe } from './pipes/safe-url.pipe';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
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
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NgxMaskModule } from 'ngx-mask';
import { ToastrModule } from 'ngx-toastr';
import { WelcomeComponent } from './components/welcome/welcome.component';

@NgModule({
  imports: [
    RouterModule,
    CommonModule,
    CurrencyMaskModule,
    FormsModule,
    NgxMaskModule.forRoot(),
    BsDatepickerModule.forRoot(),
    ReactiveFormsModule,
    HttpClientModule,
    MdbAccordionModule,
    MdbCarouselModule,
    MdbCheckboxModule,
    MdbCollapseModule,
    MdbDropdownModule,
    MdbFormsModule,
    NgbModule,
    MdbModalModule,
    MdbPopoverModule,
    MdbRadioModule,
    MdbRangeModule,
    MdbRippleModule,
    MdbScrollspyModule,
    InfiniteScrollModule,
    MdbTabsModule,
    ReactiveFormsModule,
    MdbTooltipModule,
    MdbValidationModule,
    NgbModule,
    ToastrModule.forRoot({
      timeOut: 4000,
      preventDuplicates: true,
      countDuplicates: true,
      includeTitleDuplicates: true,
      progressAnimation: 'decreasing',
      progressBar: true
    })
  ],
  exports: [HeaderComponent, InputComponent, ErrorMessageDirective, DatePickerComponent, SwitchComponent, FilterComponent, IconComponent, SelectComponent, SafePipe, CollapseDirective, ImageUploaderComponent, SwitchComponent, MultipleTagsComponent],
  declarations: [
    HeaderComponent,
    InputComponent,
    ErrorMessageDirective,
    DatePickerComponent,
    SwitchComponent,
    FilterComponent,
    IconComponent,
    CartComponent,
    SelectComponent,
    SafePipe,
    FastClickOutsideDirective,
    CollapseDirective,
    ImageUploaderComponent,
    SwitchComponent,
    MultipleTagsComponent,
    WelcomeComponent
  ],
})
export class SharedModule {}
