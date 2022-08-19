import { AbstractControl, ValidationErrors } from '@angular/forms';

export const isHour = (control: AbstractControl): ValidationErrors => {
  const value: string = control.value;
  if (!value) {
    return undefined;
  }
  if (value.length < 4 || value.length > 4 || isNaN(+value)) {
    return { hour: true }
  }
  const hour = +value.substring(0, 2);
  const minutes = +value.substring(2, 4);
  if (hour > 23 || minutes > 59) {
    return { hour: true }
  }
  return undefined;
}
