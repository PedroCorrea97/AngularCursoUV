import { CanMatchFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { take, tap } from 'rxjs';

export const authGuard: CanMatchFn = (route, state) => {
  const authService = inject(AuthService);
  const router  = inject(Router);
  return  authService.isAuthenticated$.pipe(take(1), tap((isAuthenticated:boolean) => {
    if(!isAuthenticated)
    {router.navigateByUrl('/login')} }));
};
