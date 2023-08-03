import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface User {
  id: string | null | undefined;
  username: string | null | undefined;
  password: string | null | undefined;
  email: string | null | undefined;
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
  // login = id
  getUserByID(id: any) {
    return this.http.get<any>(this.apiUrl + '/' + id);
  }
  addUser(formData: User) {
    return this.http.post(this.apiUrl, formData);
  }
}
