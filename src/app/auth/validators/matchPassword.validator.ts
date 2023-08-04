import {
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
  FormGroup,
} from '@angular/forms';

export const passwordMatchValidator: ValidatorFn = (
  formGroup: AbstractControl
): ValidationErrors | null => {
  if (
    formGroup.get('password')?.value === formGroup.get('confirmPassword')?.value
  )
    return null;
  else return { passwordMismatch: true };
};
