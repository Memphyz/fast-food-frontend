import { defaultDateValidator } from './../../validators/date-validator';
import { Component, Input, OnInit, Optional, Self } from '@angular/core';
import { AbstractControl, ControlValueAccessor, NgControl } from '@angular/forms';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { defineLocale, ptBrLocale } from 'ngx-bootstrap/chronos';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { noop } from 'rxjs';

@Component({
  selector: 'fast-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss'],
})
export class DatePickerComponent implements ControlValueAccessor, OnInit {

  @Input() public label!: string;
  @Input() public placeholder!: string;
  @Input() public onlyMonth!: boolean;
  @Input() public minDate: Date = new Date(1600, 1, 1);
  @Input() public maxDate: Date = new Date();

  public required = false;
  public disabled: boolean;
  date: { year: number, month: number };
  public value: Date = new Date();

  public get inputValue(): Date {
    return this.value || new Date();
  }

  public set dateModel(dateValue: NgbDateStruct) {
    this.inputValue = new Date(dateValue.year, dateValue.month, dateValue.day);
  }

  public set inputValue(value: any) {
    if (!this.disabled) {
      this.value = value;
      this.onChange(value);
      this.onTouched(value);
    }
  }

  public onChange: (value: any) => void = noop;
  public onTouched: (value: any) => void = noop;

  public get control(): AbstractControl | null {
    return this.ngControl?.control;
  }

  constructor(
    @Optional() @Self() public ngControl: NgControl,
    private readonly localeService: BsLocaleService
  ) {
    if (this.ngControl !== null) {
      this.ngControl.valueAccessor = this;
    }

    defineLocale('pt', ptBrLocale)
    this.localeService.use('pt')
  }

  public ngOnInit(): void {
    if (this.control) {
      this.required = this.control?.validator('' as any)?.['required'];
      this.control.addValidators(defaultDateValidator);
      this.control.updateValueAndValidity();
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

  public openCalendar(container: any): void {
    if (this.onlyMonth) {
      container.monthSelectHandler = (event: any): void => {
        container._store.dispatch(container._actions.select(event.date));
      };
      container.setViewMode('month');
    }
  }

  public onTypeDate(value: Date) {
    this.value = value
    this.control.setValue(value);
    this.onTouched(this.value);
    this.onChange(this.value);
  }
}
