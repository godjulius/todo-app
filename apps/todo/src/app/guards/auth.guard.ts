// apps/todo/src/app/core/guards/auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { CookieStorageService } from '../core/services/cookie-storage.service';
import { AUTH_TOKEN } from '../core/constant/AppConstant';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private cookieService: CookieStorageService) {}

  canActivate(): boolean {
    const token = this.cookieService.getCookie(AUTH_TOKEN);
    if (token) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
