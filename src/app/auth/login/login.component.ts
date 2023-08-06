import { Component, OnInit } from '@angular/core';
import { NgIf } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  Validators,
  FormGroup,
} from '@angular/forms';

import { AuthService, User } from '../auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

//Angular Material
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

//Validators
import { noSpaceAllowed } from '../validators/noSpaceAllowed.validator';

//Google auth
import {
  SocialAuthService,
  GoogleLoginProvider,
  GoogleSigninButtonModule,
} from '@abacritt/angularx-social-login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [
    GoogleSigninButtonModule,
    NgIf,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
  ],
})
export class LoginComponent implements OnInit {
  loginForm: any;
  userData: any;

  //user який ввійшов через гул
  googleUser: any;
  loggedIn: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router,
    private socialService: SocialAuthService
  ) {
    sessionStorage.clear();
  }

  ngOnInit(): void {
    this.createLoginForm();
    this.googleAuth();
  }

  createLoginForm(): FormGroup {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email, noSpaceAllowed]],
      password: [
        '',
        [Validators.required, Validators.minLength(5), noSpaceAllowed],
      ],
    });
    return this.loginForm;
  }

  googleAuth(): void {
    this.socialService.authState.subscribe((userData) => {
      this.googleUser = userData;
      console.log(this.googleUser);

      const userToAdd: User = {
        username: this.googleUser.firstName + ' ' + this.googleUser.lastName,
        email: this.googleUser.email,
        password: null,
        role: 'googleUser',
        isActive: true,
      };

      //Провіряєм чи такий юзер існує в БД за його emailом, якшо існує то не регіструєм
      //і він просто входить на сайт
      //якщо юзера з таким emailом не існує в БД то також входим на сайт але заносим у БД його дані
      this.authService.getUserByEmail(userToAdd.email).subscribe({
        //if user exist
        next: (res) => {
          if (
            res &&
            res.length != 0 &&
            res.length < 2 &&
            res[0].email === userToAdd.email
          ) {
            this.toastr.success('You signed in as GoogleUser');
            this.router.navigate(['main']);
            this.loggedIn = true;
          } else {
            //if user do not exist
            this.authService.addUser(userToAdd).subscribe((result) => {
              this.toastr.success('You signed in and registered');
              console.log('User added: ' + result);
              this.router.navigate(['main']);
              this.loggedIn = true;
            });
          }
        },

        error: (err) => {
          console.log('You got error when validating user ' + err);
        },
      });
    });
  }

  submitForm() {
    if (this.loginForm.valid) {
      this.authService.getUserByEmail(this.loginForm.value.email).subscribe({
        next: (res) => {
          if (
            res &&
            res.length != 0 &&
            res.length < 2 &&
            res[0].email === this.loginForm.value.email &&
            res[0].password === this.loginForm.value.password
          ) {
            this.toastr.success('You signed in');
            this.router.navigate(['main']);
            this.loggedIn = true;
          } else {
            console.log(this.loginForm.value.email);
            console.log(this.loginForm.value.password);
            this.toastr.warning('Cant log in, invalid credentials');
          }
        },
        error: (err) => {
          this.toastr.warning('Cant log in, invalid credentials');
        },
      });
    } else {
      console.log('form invalid');
      console.log(this.loginForm.value);
    }
  }
}
