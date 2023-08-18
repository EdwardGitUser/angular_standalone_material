import { CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
export const adminGuardGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  if (authService.getUserRole() === 'admin') {
    return true;
  } else {
    return false;
  }
};
