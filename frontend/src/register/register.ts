import { Component, signal } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  imports: [RouterModule, ReactiveFormsModule, FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  currentStep = signal(1);
  showPassword = signal(false);
  registrationSuccess = signal(false);
  isRegistering = signal(false);

  // Password strength signals
  passwordStrengthPercentage = signal(0);
  passwordStrengthLevel = signal<'weak' | 'medium' | 'strong'>('weak');
  passwordStrengthText = signal('Très faible');
  passwordStrengthClass = signal('progress-bar-weak');

  // Form Controls
  firstName = '';
  lastName = '';
  phone = '';
  email = '';
  password = '';
  confirmPassword = '';
  terms = '';
  newsletter = '';

  // Static data
  steps = [
    { number: 1, label: 'Informations' },
    { number: 2, label: 'Compte' },
    { number: 3, label: 'Confirmation' },
  ];

  benefits = [
    {
      icon: 'bi-percent',
      title: 'Remises exclusives',
      description: '20% sur votre première commande',
    },
    {
      icon: 'bi-truck',
      title: 'Livraison gratuite',
      description: 'Sur commandes > 50€',
    },
    {
      icon: 'bi-star',
      title: 'Programme fidélité',
      description: 'Points à chaque achat',
    },
  ];

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) {}

  ngOnInit() {
    // Watch for password changes
  }

  // Navigation
  nextStep() {
    if (this.currentStep() < 3 && this.validateCurrentStep()) {
      this.currentStep.set(this.currentStep() + 1);
    }
  }

  prevStep() {
    if (this.currentStep() > 1) {
      this.currentStep.set(this.currentStep() - 1);
    }
  }

  // Validation
  validateCurrentStep(): boolean {
    switch (this.currentStep()) {
      case 1:
        return this.isStep1Valid();
      case 2:
        return this.isStep2Valid();
      default:
        return true;
    }
  }

  isStep1Valid(): boolean {
    return true;
  }

  isStep2Valid(): boolean {
    return true;
  }

  hasPasswordMismatch(): boolean {
    return true;
  }

  // Password strength
  checkPasswordStrength() {
    const password = '';
    let strength = 0;

    if (password.length >= 6) strength++;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;

    let percentage = strength * 20;
    let level: 'weak' | 'medium' | 'strong' = 'weak';
    let text = 'Très faible';
    let className = 'progress-bar-weak';

    if (strength >= 3) {
      level = 'medium';
      text = 'Moyen';
      className = 'progress-bar-medium';
    }
    if (strength >= 4) {
      level = 'strong';
      text = 'Fort';
      className = 'progress-bar-strong';
    }

    this.passwordStrengthPercentage.set(percentage);
    this.passwordStrengthLevel.set(level);
    this.passwordStrengthText.set(text);
    this.passwordStrengthClass.set(className);
  }

  togglePasswordVisibility() {
    this.showPassword.set(!this.showPassword());
  }

  register() {
    const data = {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      phone: this.phone,
      password: this.password,
    };
    console.log('REGISTER DATA:', data);
    if (!this.isStep2Valid()) return;

    this.isRegistering.set(true);

    this.authService.signin(data).subscribe({
      next: () => {
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Register error', err);
        this.isRegistering.set(false);
      },
    });
  }
}
