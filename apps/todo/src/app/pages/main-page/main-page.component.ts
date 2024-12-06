import {Component, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButton} from "@angular/material/button";
import {CookieStorageService} from "../../core/services/cookie-storage.service";
import {AUTH_TOKEN} from "../../core/constant/AppConstant";
import {Router} from "@angular/router";

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [CommonModule, MatButton],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css',
})
export class MainPageComponent {
  cookieService = inject(CookieStorageService);
  router = inject(Router);
  signOut() {
    this.cookieService.deleteCookie(AUTH_TOKEN);
    this.router.navigate(['/login']);
  }
}
