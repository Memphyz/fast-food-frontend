import { Component, HostBinding, Input, OnInit, Optional, Self } from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormControl,
  NgControl
} from '@angular/forms';
import { noop } from 'rxjs';

@Component({
  selector: 'fast-switch',
  templateUrl: './switch.component.html',
  styleUrls: ['./switch.component.scss']
})
export class SwitchComponent implements ControlValueAccessor, OnInit {

  public switch: boolean;

  @Input() public label: string;

  @HostBinding('class.disabled')
  public disabled: boolean;

  @HostBinding('class.required')
  public required: boolean;

  public get status(): boolean {
    return this.switch;
  }

  public set status(status: boolean) {
    this.writeValue(status);
    this.onTouched(status);
    this.onChanged(status);
  }

  private onTouched: (...args) => void = noop;
  private onChanged: (...args) => void = noop;

  private get control(): AbstractControl {
    return this.ngControl?.control || new FormControl();
  }

  constructor(@Optional() @Self() private readonly ngControl: NgControl) {
    if (this.ngControl !== null) {
      this.ngControl.valueAccessor = this;
    }
  }

  public ngOnInit(): void {
    if (this.control.validator) {
      this.required = this.control.validator('' as any)['required'];
    }
  }

  public writeValue(status: boolean): void {
    this.switch = status
  }
  public registerOnChange(fn: () => void): void {
    this.onTouched = fn;
  }
  public registerOnTouched(fn: () => void): void {
    this.onChanged = fn;
  }
  public setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

}
