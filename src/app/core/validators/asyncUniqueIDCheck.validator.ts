import { AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { AuthService, User } from '../services/auth.service';
import { map } from 'rxjs/operators';

export function uniqueEmailCheck(authService: AuthService): AsyncValidatorFn {
  return (control: AbstractControl) => {
    return authService.getAllUsers().pipe(
      map((users: User[]) => {
        const user = users.find(
          (user: User) =>
            user.email?.toLowerCase() === control.value.toLowerCase()
        );
        return user ? { emailExists: true } : null;
      })
    );
  };
}
