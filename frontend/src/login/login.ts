import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  loginForm: FormGroup;
  showPassword = false;
  isLoading = false;
  errorMessage = '';
  successMessage = '';

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rememberMe: [false],
    });
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rememberMe: [false],
    });
  }
  login() {
    console.log(this.loginForm.value);
    const { email, password } = this.loginForm.value;

    const data = {
      identifiant: email,
      password: password,
    };
    this.authService.login(data).subscribe({
      next: (res) => {
        console.log('Full response from backend:', res);
        this.authService.saveToken(res.access_token);
        console.log('Saved token:', localStorage.getItem('access_token'));
        console.log('user', this.authService.getuser());
        this.router.navigate(['/home']);
      },
      error: (err) => console.error('Login error:', err),
    });
  }
  onSubmit() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';

      // Simuler un appel API
      setTimeout(() => {
        const { identifiant, password } = this.loginForm.value;

        // Validation de démonstration
        if (
          (identifiant === 'admin@etech.com' && password === 'admin123') ||
          (identifiant === 'client@etech.com' && password === 'client123')
        ) {
          this.successMessage = 'Connexion réussie ! Redirection...';

          // Rediriger après 1.5 secondes
          setTimeout(() => {
            this.router.navigate(['/']);
          }, 1500);
        } else {
          this.errorMessage =
            'Email ou mot de passe incorrect. Essayez: admin@etech.com / admin123';
        }

        this.isLoading = false;
      }, 1500);
    } else {
      // Marquer tous les champs comme touchés pour afficher les erreurs
      Object.keys(this.loginForm.controls).forEach((key) => {
        const control = this.loginForm.get(key);
        control?.markAsTouched();
      });
    }
  }
}
