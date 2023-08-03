import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService, User } from '../auth.service';
import { Router } from '@angular/router';

//Angular Material
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

//Validators
import { matchPassword } from '../validators/matchPassword.validator';
import { noSpaceAllowed } from '../validators/noSpaceAllowed.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
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
export class RegisterComponent {
  registerForm = this.fb.group(
    {
      //id = login
      id: ['', [Validators.required, Validators.minLength(5), noSpaceAllowed]],
      username: [
        '',
        [Validators.required, Validators.minLength(5), noSpaceAllowed],
      ],
      password: [
        '',
        [Validators.required, Validators.minLength(5), noSpaceAllowed],
      ],
      confirmPassword: ['', [Validators.required, noSpaceAllowed]],
      email: ['', [Validators.required, Validators.email, noSpaceAllowed]],
      role: ['user'],
      isActive: [true],
    },
    {
      validators: matchPassword,
    }
  );

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  submitForm() {
    if (this.registerForm.valid) {
      // щоб не давати цілу форму з полем confirm password
      const userToAdd: User = {
        //id = login
        id: this.registerForm.value.id,
        username: this.registerForm.value.username,
        password: this.registerForm.value.password,
        email: this.registerForm.value.email,
        role: this.registerForm.value.role,
        isActive: this.registerForm.value.isActive,
      };

      this.authService.addUser(userToAdd).subscribe({
        next: () => {
          this.registerForm.reset();
          this.toastr.success('You registered');
        },
        error: (err) => {
          alert('Something went wrong ' + err);
        },
        complete: () => {
          this.router.navigate(['login']);
        },
      });
    } else {
      this.toastr.warning('Form is not valid!');
    }
    console.log(this.registerForm);
  }
}
