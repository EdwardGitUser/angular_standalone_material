import { Component, OnInit } from '@angular/core';
import { NgIf } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService, User } from '../../../core/services/auth.service';
import { Router } from '@angular/router';

//Angular Material
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

//Validators
import { passwordMatchValidator } from '../../../core/validators/matchPassword.validator';
import { noSpaceAllowed } from '../../../core/validators/noSpaceAllowed.validator';
import { uniqueEmailCheck } from '../../../core/validators/asyncUniqueIDCheck.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  standalone: true,
  providers:[AuthService],
  imports: [
    NgIf,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
  ],
})
export class RegisterComponent implements OnInit {
  registerForm: any;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group(
      {
        username: [
          '',
          [Validators.required, Validators.minLength(5), noSpaceAllowed],
        ],
        email: [
          '',
          {
            validators: [Validators.required, Validators.email, noSpaceAllowed],
            asyncValidators: uniqueEmailCheck(this.authService),
            updateOn: 'blur',
          },
        ],
        password: [
          '',
          [Validators.required, Validators.minLength(5), noSpaceAllowed],
        ],
        confirmPassword: ['', [Validators.required]],
        role: ['user'],
        isActive: [true],
      },
      {
        validators: passwordMatchValidator,
      }
    );
  }

  get confirmPassword() {
    return this.registerForm.get('confirmPassword');
  }

  //спеціально задаєм setError для поля сonfirmpassword щоб mat-error спрацьовував
  //бо mat-error спрацьовує на помилки тільки полів, а на помилки форми вцілому він не спрацьовує
  onPasswordInput() {
    if (this.registerForm.hasError('passwordMismatch'))
      this.confirmPassword?.setErrors([{ passwordMismatch: true }]);
    else this.confirmPassword?.setErrors(null);
  }

  submitForm() {
    if (this.registerForm.valid) {
      // щоб не давати цілу форму з полем confirm password
      const userToAdd: User = {
        username: this.registerForm.value.username,
        email: this.registerForm.value.email,
        password: this.registerForm.value.password,
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
    console.log(this.registerForm.value);
  }
}
