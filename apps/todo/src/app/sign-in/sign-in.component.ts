import {Component, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatTab, MatTabGroup} from "@angular/material/tabs";
import {TranslatePipe, TranslateService} from "@ngx-translate/core";
import {MatOption, MatSelect} from "@angular/material/select";
import {HttpClient} from "@angular/common/http";
import {BASE_URL} from "../core/constant/ApiConstant";
import {CookieStorageService} from "../core/services/cookie-storage.service";
import {AUTH_TOKEN} from "../core/constant/AppConstant";
import {catchError} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatTabGroup, MatTab, TranslatePipe, MatSelect, FormsModule, MatOption],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss',
})
export class SignInComponent {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });
  signupForm = new FormGroup({
    emailSignUp: new FormControl('', [Validators.required, Validators.email]),
    //todo: Add password and confirmPassword validation
    passwordSignUp: new FormControl('', [Validators.required]),
    confirmPasswordSignUp: new FormControl('', [Validators.required]),
  })
  languages = ['en', 'vi'];
  selectedLanguage = 'en';
  translateService = inject(TranslateService);
  httpClient = inject(HttpClient);
  cookieService = inject(CookieStorageService)
  router = inject(Router);
  constructor() {
    this.languages = this.translateService.getLangs();
  }

  signIn() {
    if (this.loginForm.invalid) {
      return;
    }
    const username = this.loginForm.get('email')?.value;
    const password = this.loginForm.get('password')?.value;
    console.log('Username:', username);
    console.log('Password:', password)
    this.httpClient.post(`${BASE_URL}/sign-in`, {email: username, password: password})
      .pipe(
        catchError((error: any) => {
          console.log('Error in component: ', error);
          return error;
        })
      )
      .subscribe((response: unknown) => {
      if (response) {
        console.log('Response:', response);
        this.cookieService.setCookie(AUTH_TOKEN, (response as ISignInResponse).access_token, 1);
        //todo: Navigate to home page
        this.router.navigate(['/main']);
      }
    });
  }

  signUp() {
    if (this.signupForm.invalid) {
      return;
    }
    const username = this.signupForm.get('emailSignUp')?.value;
    const password = this.signupForm.get('passwordSignUp')?.value;
    console.log('Username:', username);
    console.log('Password:', password);

    // Authenticate with an API or Google Firebase Auth
  }

  changeLanguage(value: string) {
    this.translateService.use(value)
  }
}

interface ISignInResponse {
  access_token: string;
}
