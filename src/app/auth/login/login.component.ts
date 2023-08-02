import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

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
  loginForm = this.fb.group({
    login: [null, [Validators.required, Validators.minLength(5)]],
    password: [null, [Validators.required, Validators.minLength(5)]],
  });

  constructor(private fb: FormBuilder) {}

  submitForm() {
    console.log(this.loginForm.value);
  }
}
