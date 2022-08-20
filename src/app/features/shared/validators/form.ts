import { AbstractControl, FormGroup, ValidatorFn } from '@angular/forms';
import { noop } from 'rxjs';

export const requiredIfAnyFieldFormHasValue: (field: string, validator: ValidatorFn | ValidatorFn[]) => ValidatorFn = (field: string, validator: ValidatorFn | ValidatorFn[]): ValidatorFn => {
  return (control: AbstractControl) => {
    if (Object.values(control.value).some(value => !!value)) {
      control.get(field).setValidators(validator);
    } else {
      control.get(field).setValidators([]);
    }
    control.get(field).updateValueAndValidity({ emitEvent: false, onlySelf: true })
    return undefined;
  }
}
export const applyValidatorIfCondition: (
  field: string,
  validator: ValidatorFn | ValidatorFn[],
  next: (control: FormGroup) => boolean) => ValidatorFn = (field: string, validator: ValidatorFn | ValidatorFn[], next: (control: FormGroup) => boolean): ValidatorFn => {
    return (control: AbstractControl) => {
      let form = control as FormGroup;
      while (form.parent) {
        form = form.parent as FormGroup;
      }
      if ((next || noop)(form)) {
        control.get(field).setValidators(validator);
      } else {
        control.get(field).setValidators([]);
      }
      control.get(field).updateValueAndValidity({ emitEvent: false, onlySelf: true })
      return undefined;
    }
  }

