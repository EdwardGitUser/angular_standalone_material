import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
//Angular Material
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

//Validators
import { noSpaceAllowed } from '../validators/noSpaceAllowed.validator';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [
    NgIf,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
  ],
})
export class LoginComponent {
  userData: any;

  loginForm = this.fb.group({
    login: ['', [Validators.required, Validators.minLength(5), noSpaceAllowed]],
    password: [
      '',
      [Validators.required, Validators.minLength(5), noSpaceAllowed],
    ],
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router
  ) {
    sessionStorage.clear();
  }

  submitForm() {
    if (this.loginForm.valid) {
      this.authService
        .getUserByID(this.loginForm.value.login)
        .subscribe((res) => {
          this.userData = res;
          console.log(this.userData);
          if (this.userData.password === this.loginForm.value.password) {
            if (this.userData.isActive) {
              sessionStorage.setItem('username', this.userData.id);
              sessionStorage.setItem('userrole', this.userData.role);
              this.router.navigate(['']);
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
