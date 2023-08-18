import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Params } from '@angular/router';
import {
  ReactiveFormsModule,
  FormBuilder,
  Validators,
  FormGroup,
} from '@angular/forms';
import { Subscription } from 'rxjs';

import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatOptionModule } from '@angular/material/core';
import { AuthService, User } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-admin-user-page',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatListModule,
    MatOptionModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatCheckboxModule,
  ],
  templateUrl: './admin-user-page.component.html',
  styleUrls: ['./admin-user-page.component.css'],
})
export class AdminUserPageComponent implements OnInit, OnDestroy {
  user: any;
  private userSubscription: Subscription | undefined;
  private updateSubscription: Subscription | undefined;

  userForm = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(5)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(5)]],
    role: [''],
    isActive: [],
  });

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    const userId = +this.route.snapshot.params['id'];
    this.getUser(userId);
  }

  getUser(id: number): void {
    this.userSubscription = this.authService.getUserById(id).subscribe({
      next: (res) => {
        this.user = res;
        this.userForm.patchValue({
          username: this.user.username,
          email: this.user.email,
          password: this.user.password,
          role: this.user.role,
          isActive: this.user.isActive,
        });
        console.log(this.user);
      },
    });
  }

  submitForm() {
    if (this.userForm.valid) {
      const updatedUser: User = {
        username: this.userForm.value.username!,
        email: this.userForm.value.email!,
        password: this.userForm.value.password!,
        role: this.userForm.value.role!,
        isActive: this.userForm.value.isActive!,
      };

      const userId = +this.route.snapshot.params['id'];
      this.updateSubscription = this.authService
        .updateUser(userId, updatedUser)
        .subscribe({
          next: (res) => {
            console.log('User updated successfully:', res);
            this.userForm.reset();
          },
          error: (err) => {
            console.error('Error updating user:', err);
          },
        });
    }
  }
  ngOnDestroy(): void {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }

    if (this.updateSubscription) {
      this.updateSubscription.unsubscribe();
    }
  }
}
