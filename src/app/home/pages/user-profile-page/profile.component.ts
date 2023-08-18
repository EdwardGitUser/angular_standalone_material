import { Component } from '@angular/core';
import { AsyncPipe, NgIf } from '@angular/common';
import { Observable, of } from 'rxjs';
import { AuthService, User } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [AsyncPipe, NgIf],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent {
  user$: Observable<User | null>;

  constructor(private authService: AuthService) {
    const userEmail = sessionStorage.getItem('email');
    this.user$ = userEmail
      ? this.authService.getUserByEmail(userEmail)
      : of(null);
  }
}
