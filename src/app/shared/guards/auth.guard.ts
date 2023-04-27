import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

export const authGuard = () => {
  const router = inject(Router);
  const authService = inject(AuthService);
  return authService.checkAuthentication().subscribe(isAuthenticated => {
    console.log('isAuthenticated', isAuthenticated);
    if (!isAuthenticated) {
      router.navigate(['/login']);
    }
    return isAuthenticated;
  });
};
