import { Component, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Navbar } from './components/navbar/navbar';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth.interceptor';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar],
  templateUrl: './app.html',
  styleUrl: './app.css',
  providers: [],
})
export class App {
  constructor(private authService: AuthService, private router: Router) {}
  user: any;
  protected readonly title = signal('frontend');
  loadUser() {
    const user$ = this.authService.getCurrentUser();
    if (user$) {
      user$.subscribe((res: any) => {
        this.user = res;
        console.log('user ishere ', this.user);
        localStorage.setItem('user', JSON.stringify(res));
      });
    } else {
      this.user = null;
    }
  }

  ngOnInit() {
    if (!localStorage.getItem('access_token')) {
      localStorage.removeItem('user');
    }
    if (typeof window !== 'undefined') {
      if (this.authService.isLoggedIn()) {
        console.log('User is logged in');
        this.loadUser();
      } else {
        console.log('User is NOT logged in');
      }
    }
  }
}
