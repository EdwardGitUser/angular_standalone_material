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
import { SocialAuthService } from '@abacritt/angularx-social-login';
import { GoogleSigninButtonModule } from '@abacritt/angularx-social-login';

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
    this.googleAuth();

    this.createLoginForm();
  }

  createLoginForm(): FormGroup {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]],
    });
    return this.loginForm;
  }

  googleAuth(): void {
    this.socialService.authState.subscribe((userData) => {
      this.googleUser = userData;
      console.log(this.googleUser);

      const userToAdd: User = {
        //id = email
        id: this.googleUser.email,
        username: this.googleUser.firstName + ' ' + this.googleUser.lastName,
        password: null,
        role: 'googleUser',
        isActive: true,
      };

      //Провіряєм чи такий юзер існує в БД за його emailом, якшо існує то не регіструєм
      //і він просто входить на сайт
      //якщо юзера з таким emailом не існує в БД то також входим на сайт але заносим у БД його дані
      this.authService.getUserByID(userToAdd.id).subscribe(
        //if user exist
        () => {
          this.toastr.success('You signed in as GoogleUser');
          this.router.navigate(['main']);
          this.loggedIn = true;
        },

        //if user do not exist
        (error) => {
          this.authService.addUser(userToAdd).subscribe((result) => {
            this.toastr.success('You signed in and registered');
            console.log(result);
            this.router.navigate(['main']);
            this.loggedIn = true;
          });
        }
      );
    });
  }

  submitForm() {
    if (this.loginForm.valid) {
      this.authService
        .getUserByID(this.loginForm.value.email)
        .subscribe((res) => {
          this.userData = res;
          console.log(this.userData);
          if (this.userData.password === this.loginForm.value.password) {
            if (this.userData.isActive) {
              sessionStorage.setItem('useremail', this.userData.id);
              sessionStorage.setItem('userrole', this.userData.role);
              this.router.navigate(['main']);
            } else {
              this.toastr.error('Inactive user');
            }
          } else {
            this.toastr.error('Password does not match with the Login');
          }
        });
    }
  }
}
