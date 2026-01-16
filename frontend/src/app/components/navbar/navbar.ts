import { ChangeDetectorRef, Component } from '@angular/core';
import { ApiService, Category } from '../../../services/api.services';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  categories: Category[] = [];
  constructor(
    private ApiService: ApiService,
    private authservice: AuthService,
    private cdr: ChangeDetectorRef
  ) {}
  islogged: boolean = false;
  user: any;
  loadcategories() {
    this.ApiService.getlallcategories().subscribe((res: any) => {
      this.categories = res;
      this.cdr.detectChanges();
    });
  }
  logout() {
    this.authservice.logout();
    window.location.reload();
  }
  loadUser() {
    const user$ = this.authservice.getCurrentUser();
    if (user$) {
      user$.subscribe((res: any) => {
        this.user = res;
        console.log(this.user);
      });
    } else {
      this.user = null;
    }
  }

  ngOnInit() {
    if (this.authservice.isBrowser()) {
      this.loadcategories();
      this.loadUser();
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        this.user = JSON.parse(storedUser);
        this.islogged = true;
      }
    }
  }
}
