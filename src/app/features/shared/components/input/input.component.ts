import {
  Component,
  EventEmitter,
  HostBinding,
  Input,
  OnInit,
  Optional,
  Output,
  Self
} from '@angular/core';
import { AbstractControl, ControlValueAccessor, NgControl } from '@angular/forms';
import { uniqueId } from 'lodash';
import { noop } from 'rxjs';

type InputType = 'button' | 'checkbox' | 'color' | 'datetime-local' | 'email' | 'file' | 'hidden' | 'image' | 'month' | 'number' | 'password' | 'radio' | 'range' | 'reset' | 'search' | 'submit' | 'tel' | 'text' | 'time' | 'url' | 'week' | 'select' | 'textarea';

@Component({
  selector: 'fast-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent implements ControlValueAccessor, OnInit {

  @Input() public label!: string;
  @Input() public placeholder!: string;
  @Input() public minLength!: string | number;
  @Input() public maxLength!: string | number;
  @Input() public mask!: string;
  @Input() public leftIcon!: string;
  @Input() public rightIcon!: string;
  @Input() public readonly!: boolean;
  @Input() public color!: string;
  @Input() public visibleValue!: string;
  @Input() public type: InputType = 'text';

  public readonly id = window.btoa(uniqueId());

  @Output() public readonly rightIconEvent = new EventEmitter<void>();
  @Output() public readonly inputValueChange = new EventEmitter<string>();
  @Output() public readonly leftIconEvent = new EventEmitter<void>();

  @HostBinding('class.disabled')
  public disabled: boolean;
  public required = false;
  public value = '';

  public get inputValue(): string {
    return this.value || '';
  }

  public set inputValue(value: string) {
    if (!this.disabled) {
      this.writeValue(value);
      this.onChange(value);
      this.onTouched(value);
    }
  }

  public onChange: (value: any) => void = noop;
  public onTouched: (value: any) => void = noop;

  private get control(): AbstractControl | null {
    return this.ngControl?.control;
  }

  constructor(
    @Optional() @Self() public ngControl: NgControl,
  ) {
    if (this.ngControl !== null) {
      this.ngControl.valueAccessor = this;
    }
  }

  public ngOnInit(): void {
    if (this.control?.validator) {
      this.required = this.control.validator('' as any)?.['required'];
    }
  }

  public writeValue(write: any): void {
    this.value = write;
  }

  public registerOnChange(fn: () => void): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  public setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

}
