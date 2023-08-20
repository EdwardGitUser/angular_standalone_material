import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

export interface User {
  username: string;
  email: string;
  password: string;
  role: string;
  isActive: boolean;
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

  getUserById(id: number) {
    return this.http.get<User>(this.apiUrl + '/' + id);
  }

  // щоб замість масиву вертало тільки одного юзера
  getUserByEmail(email: string): Observable<User> {
    return this.http
      .get<User[]>(this.apiUrl + '?email=' + email)
      .pipe(map((users) => users[0]));
  }

  addUser(userData: User) {
    return this.http.post<User>(this.apiUrl, userData);
  }

  updateUser(id: number, userData: User) {
    return this.http.put<User>(`${this.apiUrl}/${id}`, userData);
  }

  isLoggedIn() {
    return sessionStorage.getItem('email') != null;
  }
  getUserRole() {
    return sessionStorage.getItem('role');
  }
}
