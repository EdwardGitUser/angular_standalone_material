import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface User {
  username: string | null | undefined;
  email: string | null | undefined;
  password: string | null | undefined;
  role: string | null | undefined;
  isActive: boolean | null | undefined;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  apiUrl = 'http://localhost:3000/users';

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }
  getUserByEmail(email: string | null | undefined) {
    return this.http.get<User[]>(this.apiUrl + '?email=' + email);
  }
  addUser(userData: User) {
    return this.http.post<User>(this.apiUrl, userData);
  }
}
