import { AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { AuthService, User } from '../auth.service';
import { map } from 'rxjs/operators';

export function uniqueIDCheck(authService: AuthService): AsyncValidatorFn {
  return (control: AbstractControl) => {
    return authService.getAllUsers().pipe(
      map((users: User[]) => {
        const user = users.find(
          (user: User) => user.id?.toLowerCase() === control.value.toLowerCase()
        );
        return user ? { emailExists: true } : null;
      })
    );
  };
}
