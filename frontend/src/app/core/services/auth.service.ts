import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, tap} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private API_URL = 'http://localhost:3000/api/auth';

  constructor(private http: HttpClient) {}

  private userSubject = new BehaviorSubject<any>(
    JSON.parse(localStorage.getItem('user') || 'null'));

  user$ = this.userSubject.asObservable();

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user') || 'null');
  }

  login(data: { username: string; password: string }) {
    return this.http.post<any>(`${this.API_URL}/login`, data).pipe(
      tap(res => this.saveAuth(res.token, res.user)),
    )
  }

  register(data: any) {
    return this.http.post<any>(`${this.API_URL}/register`, data).pipe(
      tap(res => this.saveAuth(res.token, res.user)),
    )
  }

  me() {
    return this.http.get<any>(`${this.API_URL}/me`);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  saveAuth(token: string, user: any) {
    localStorage.setItem('token', token);
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
      this.userSubject.next(user);
    }
  }

  getUser() {
    const u = localStorage.getItem('user');
    return u ? JSON.parse(u) : null;
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.userSubject.next(null);
  }



}
