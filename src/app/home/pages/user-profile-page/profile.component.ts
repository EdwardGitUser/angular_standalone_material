import { Component, OnInit } from '@angular/core';
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
export class ProfileComponent implements OnInit {
  user$!: Observable<User>;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    const userEmail = sessionStorage.getItem('email')!;
    this.user$ = this.authService.getUserByEmail(userEmail);
  }
}
