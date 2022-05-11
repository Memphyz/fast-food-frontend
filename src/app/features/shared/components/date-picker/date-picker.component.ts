import { defaultDateValidator } from './../../validators/date-validator';
import { Component, Input, OnInit, Optional, Self } from '@angular/core';
import { AbstractControl, ControlValueAccessor, NgControl } from '@angular/forms';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { cloneDeep } from 'lodash';
import { noop } from 'rxjs';

@Component({
  selector: 'fast-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss'],
})
export class DatePickerComponent implements ControlValueAccessor, OnInit {


  @Input() public label!: string;
  @Input() public placeholder!: string;
  @Input() public minDate: Date = new Date(1600, 1, 1);
  @Input() public maxDate: Date = new Date();

  public required = false;
  public disabled: boolean;
  date: { year: number, month: number };
  public visibleValue: string;
  public value: Date = new Date();

  public get inputValue(): Date {
    return this.value || new Date();
  }

  public set dateModel(dateValue: NgbDateStruct) {
    this.inputValue = new Date(dateValue.year, dateValue.month, dateValue.day);
  }

  public get minDateStruct(): NgbDateStruct {
    return {
      day: this.minDate.getDay(),
      month: this.minDate.getMonth(),
      year: this.minDate.getFullYear()
    }
  }

  public get maxDateStruct(): NgbDateStruct {
    return {
      day: this.maxDate.getDay(),
      month: this.maxDate.getMonth(),
      year: this.maxDate.getFullYear()
    }
  }

  public set inputValue(value: any) {
    if (!this.disabled) {
      this.value = value;
      this.updateVisibleValue();
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
  ) {
    if (this.ngControl !== null) {
      this.ngControl.valueAccessor = this;
    }
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

  public onTypeDate() {
    this.control.setValue(+this.visibleValue);
    this.onTouched(this.visibleValue);
    this.onChange(this.visibleValue);
    const cloneVisibleValue = cloneDeep(this.visibleValue);
    const value = cloneVisibleValue.replace(/(\d{2})(\d{2})(\d{4})/, '$1/$2/$3');
    const usDate = cloneVisibleValue.replace(/(\d{2})(\d{2})(\d{4})/, '$2-$1-$3');
    if (value.length === 10) {
      const date = new Date(usDate);
      if (!isNaN(date as any)) {
        this.inputValue = date;
        this.dateModel = this.formatDateToStruct(date);
        this.updateVisibleValue();
        this.visibleValue = cloneVisibleValue.replace(/(\d{2})(\d{2})(\d{4})/, '$1/$2/$3');
      }

    }
  }

  private updateVisibleValue(): void {
    this.visibleValue = this.inputValue.toLocaleDateString('pt-BR')
  }

  private formatDateToStruct(date: Date): NgbDateStruct {
    return {
      day: date.getDay(),
      month: date.getMonth(),
      year: date.getFullYear()
    }
  }
}
