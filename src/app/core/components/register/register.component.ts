import { Component, OnInit, inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserData } from '../../models/user-data.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  fullname = new FormControl('', [Validators.required]);
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);

  private router = inject(Router);
  private authService = inject(AuthService);

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      fullname: this.fullname,
      email: this.email,
      password: this.password,
    });
  }

  async onRegister(): Promise<void> {
    if (!this.fullname.value || !this.email.value || !this.password.value) {
      alert('Complete all the required fields');
      return;
    }

    try {
      const userData: UserData = {
        fullname: this.fullname.value,
        email: this.email.value,
        password: this.password.value,
      };
      const registerResponse = await this.authService.register(userData);
      console.log(registerResponse);
      this.router.navigate(['/radar']);
    } catch (error) {
      console.log(error);
    }
  }

  getFullnameErrorMessage(): string {
    if (this.fullname.hasError('required')) {
      return 'You must enter a value';
    }

    return '';
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
