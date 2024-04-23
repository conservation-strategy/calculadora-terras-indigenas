import { AbstractControl, ValidatorFn } from '@angular/forms';

export function rangeValidator(min: number, max: number): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    if (
      control.value &&
      (isNaN(control.value) || control.value < min || control.value > max)
    ) {
      return { range: { min, max } };
    }
    return null;
  };
}
