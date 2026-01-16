import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { Observable } from 'rxjs';
export interface User {
  id: number;
  email: string;
  lastName: string;
  firstName: string;
  role: string;
  phone: string;
  password: string;
}
export interface AuthResponse {
  message: string;
  access_token: string;
}
@Injectable({ providedIn: 'root' })
export class AuthService {
  private API = 'http://localhost:3000'; // your NestJS URL

  constructor(private http: HttpClient) {}
  isBrowser(): boolean {
    return typeof window !== 'undefined';
  }
  login(data: { identifiant: string; password: string }) {
    return this.http.post<AuthResponse>('http://localhost:3000/users/login', data);
  }

  saveToken(token: string) {
    localStorage.setItem('access_token', token);
  }

  getToken(): string | null {
    if (!this.isBrowser()) return null;
    return localStorage.getItem('access_token');
  }
  getuser() {
    return this.http.get<User>('http://localhost:3000/users/me');
  }

  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
  }
  getUserInfo() {
    return this.http.get<any>('http://localhost:3000/users/me');
  }
  isLoggedIn(): boolean {
    // check if running in browser
    if (!this.isBrowser()) return false;

    const token = localStorage.getItem('access_token');
    if (!token) return false;

    try {
      const decoded: any = jwtDecode(token);
      return decoded.exp * 1000 > Date.now();
    } catch {
      localStorage.removeItem('access_token');
      localStorage.removeItem('user');
      return false;
    }
  }
  getCurrentUserPayload() {
    if (!this.isBrowser()) return null;

    const token = this.getToken();
    if (!token) return null;

    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch {
      localStorage.removeItem('access_token');
      localStorage.removeItem('user');
      return null;
    }
  }

  // Use the ID from token to call backend and get full user info
  getCurrentUser(): Observable<any> | null {
    const payload = this.getCurrentUserPayload();
    if (!payload) return null;

    // Interceptor will automatically add Authorization header
    return this.http.get<any>(`http://localhost:3000/users/find/${payload.id}`);
  }

  getTokenRemainingTime(): number {
    if (typeof window === 'undefined') return 0;

    const token = localStorage.getItem('access_token');
    if (!token) return 0;

    try {
      const decoded: any = jwtDecode(token);
      return Math.max(decoded.exp * 1000 - Date.now(), 0) / 1000;
    } catch {
      localStorage.removeItem('access_token');
      return 0;
    }
  }
  signin(data: any) {
    return this.http.post<any>('http://localhost:3000/users/register', data);
  }
}
