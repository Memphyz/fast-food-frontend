import { SelectOption } from './../../../../core/models/select-option.interface';
import { equals } from './../../utils/equals';
import { StringUtils } from './../../utils/string-utils';
import {
  AfterViewChecked,
  Component,
  DoCheck,
  ElementRef,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  Optional,
  Output,
  Self
} from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { noop } from 'rxjs';

@Component({
  selector: 'fast-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent implements ControlValueAccessor, AfterViewChecked, DoCheck {

  @Input() public label: string;
  @Input() public autocomplete: boolean;
  @Input() public register: boolean;
  @Input() public signLabel = 'Cadastrar';
  @Input() @HostBinding('class.fast-disabled') public disabled: boolean;
  @Input() public options: SelectOption<unknown>[];
  @Input() public pk: string;

  @Output() public readonly signEvent = new EventEmitter();

  public selected: SelectOption<unknown>;
  public formValue: unknown;
  public cache: SelectOption<unknown>;
  public filter: string;
  public index: number;

  private started: boolean;

  public get selectedOption(): SelectOption<unknown> {
    return this.selected;
  }

  public set selectedOption(selected: SelectOption<unknown>) {
    this.selected = selected;
    this.cache = selected;
    this.writeValue(selected?.value);
  }

  @HostBinding('class.fast-select-open') public open: boolean;

  public onChange: (value: any) => void = noop;
  public onTouched: (value: any) => void = noop;

  public get filtered(): SelectOption<unknown>[] {
    return this.filter ? this.options?.filter((option) => StringUtils.removeAccent(option?.label?.toLowerCase()).includes(StringUtils.removeAccent(this.filter?.toLowerCase()))) : this.options;
  }

  constructor(private readonly el: ElementRef, @Optional() @Self() private readonly ngControl: NgControl) {
    this.ngControl && !this.ngControl.valueAccessor && (this.ngControl.valueAccessor = this);
  }

  public ngDoCheck(): void {
    if ((!this.selected && this.formValue) || this.formValue && !equals(this.formValue, this.selected.value, { uniqueField: this.pk })) {
      this.selected = this.options?.find((option) => equals(this.formValue, option.value, { uniqueField: this.pk }));
      return undefined;
    }
    if (this.selected && !this.formValue) {
      this.selected = undefined;
    }
  }

  public ngAfterViewChecked(): void {
    this.started = true;
  }

  public writeValue(selected: unknown): void {
    this.formValue = selected;
    this.onTouched(selected);
    this.onChange(selected);
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

  public isSelected(option: SelectOption<unknown>): boolean {
    return this.selected && (this.selected.value === (option.value || equals(this.selected.value, option.value, { uniqueField: this.pk }) && option.value));
  }

  @HostListener('document:click', ['$event.target'])
  public click(target: HTMLElement): void {
    (this.el.nativeElement as HTMLElement).contains(target) ? this.toggle() : this.open = false
  }

  public toggle(): void {
    this.open = !this.open;
  }

  public offsetHeight(element: HTMLDivElement): number {
    return this.started ? element.offsetHeight + 5 : 45;
  }

}
