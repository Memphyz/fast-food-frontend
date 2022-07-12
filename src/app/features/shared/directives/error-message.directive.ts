import { ErrorMessage } from '../abstracts/error-message.abstract';
import {
  Directive,
  DoCheck,
  ElementRef,
  Input,
  OnDestroy,
  Optional,
  Renderer2
} from '@angular/core';
import { FormControl, NgControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';

// tslint:disable: directive-selector
@Directive({
  selector: '[errorMessage]',
})
export class ErrorMessageDirective
  extends ErrorMessage
  implements DoCheck, OnDestroy {
  @Input() public field!: string
  @Input() public declare customErrors: { [key: string]: string };

  public errorMessageWrapperElement: HTMLElement;
  public errorMessageElement: HTMLElement;

  private created = false;
  private readonly checkMessage = new Subject<string>();

  constructor(
    private readonly el: ElementRef,
    private readonly renderer: Renderer2,
    @Optional() private readonly ngControl: NgControl
  ) {
    super();
    this.create();
    this.checkMessage
      .pipe(distinctUntilChanged())
      .subscribe(this.checkIfCanCreateMessage.bind(this));
  }

  public ngDoCheck(): void {
    this.checkMessage.next(
      this.control?.invalid && this.control?.touched
        ? JSON.stringify(this.control.errors)
        : ''
    );
  }

  public ngOnDestroy(): void {
    this.renderer.removeChild(
      this.el.nativeElement,
      this.errorMessageWrapperElement
    );
  }

  private get control(): FormControl {
    return this.ngControl?.control as FormControl;
  }

  private checkIfCanCreateMessage(): void {
    if (!this.control?.invalid || !this.control?.touched) {
      this.removeMessage();
      this.create();
      return undefined;
    }
    this.autoGenerateMessage();
  }

  private autoGenerateMessage(): void {
    if (!this.control.touched && !this.control.value && this.created) {
      this.removeMessage();
      return undefined;
    }
    const message = this.getErrorMessage(
      this.control,
      this.field || this.ngControl.valueAccessor['label']?.toLowerCase()
    );

    if (!this.created) {
      this.create();
      return undefined;
    }
    this.generateMessage(message);
  }

  private removeMessage(): void {
    this.renderer.removeChild(
      this.el.nativeElement,
      this.errorMessageWrapperElement
    );
    this.created = false;
  }

  private generateMessage(currValue: any): void {
    const value = !currValue ? '' : currValue;
    this.renderer.setProperty(this.errorMessageElement, 'innerText', value);
  }

  private create(): void {
    this.errorMessageWrapperElement = this.renderer.createElement('div');
    this.errorMessageElement = this.renderer.createElement('div');

    this.renderer.addClass(
      this.errorMessageWrapperElement,
      'fast-form-control-error-wrapper'
    );
    this.renderer.addClass(this.errorMessageElement, 'fast-form-control-error');
    this.renderer.appendChild(
      this.errorMessageWrapperElement,
      this.errorMessageElement
    );
    setTimeout((): void => {
      this.renderer.appendChild(
        this.el.nativeElement,
        this.errorMessageWrapperElement
      );
    })
    this.created = true;
  }
}
