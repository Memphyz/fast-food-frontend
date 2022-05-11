import { AbstractControl } from '@angular/forms';
import { cloneDeep } from 'lodash';

export const defaultDateValidator = (control: AbstractControl): object => {
  if (!control.value || control.value instanceof Date) {
    return undefined;
  }
  const valueControl = cloneDeep(control.value?.toString());
  const valuesTyped = typeof control.value === 'number' ? valueControl.replace(/(\d{2})(\d{2})(\d{4})/, '$1/$2/$3').split('/') : control.value?.split('/');
  const value = valuesTyped.join('');
  if (value?.length === 8) {
    const { day, month, year } = valuesTyped;
    if (!isValidDate(+year, +month, +day)) {
      return { dataInvalida: true };
    }
    return undefined;
  }

  return { dataInvalida: true };
};


export const isValidDate = (year, month, day): boolean => {
  month = month - 1;
  const dateDay = new Date(year, month, day);
  if (
    dateDay.getFullYear() === year &&
    dateDay.getMonth() === month &&
    dateDay.getDate() === day
  ) {
    return true;
  }
  return false;
};
