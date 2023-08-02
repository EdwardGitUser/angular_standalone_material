import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

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
  registerForm = this.fb.group({
    login: [null, [Validators.required, Validators.minLength(5)]],
    username: [null, [Validators.required, Validators.minLength(5)]],
    password: [null, [Validators.required, Validators.minLength(5)]],
    confirmPassword: [null, [Validators.required]],
    email: [null, [Validators.required, Validators.email]],
  });
  constructor(private fb: FormBuilder) {}

  submitForm() {
    console.log(this.registerForm.value);
  }
}
