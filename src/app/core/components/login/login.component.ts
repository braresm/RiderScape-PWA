import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);

  private router = inject(Router);
  private authService = inject(AuthService);

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: this.email,
      password: this.password,
    });
  }

  async onLogin(): Promise<void> {
    if (!this.email.value || !this.password.value) {
      alert('Complete all the required fields');
      return;
    }

    try {
      const loginResponse = await this.authService.login(
        this.email.value,
        this.password.value
      );
      console.log(loginResponse);
      this.router.navigate(['/radar']);
    } catch (error: any) {
      if (error.code == 'auth/user-not-found') {
        alert('Invalid credentials');
      } else {
        console.error(error);
      }
    }
  }

  getEmailErrorMessage(): string {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }
  getPasswordErrorMessage(): string {
    if (this.password.hasError('required')) {
      return 'You must enter a value';
    }

    return '';
  }
}
