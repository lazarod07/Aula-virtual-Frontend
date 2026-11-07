import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginService } from '../../services/loginService';
import { Router } from '@angular/router';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-login',
  styleUrl: './login.css',
  templateUrl: './login.html',
  standalone: true
})
export class Login {

  private readonly fb = inject(FormBuilder);
  private readonly loginService = inject(LoginService);
  private readonly router = inject(Router);
  loading = signal(false);

  loginForm = this.fb.nonNullable.group({
    'usuario': ['', Validators.required],
    'contrasena': ['', Validators.required]
  });

  onSubmit(): void {
    if(this.loginForm.invalid) {
      return;
    }

    this.loading.set(true);

    this.loginService.login(this.loginForm.getRawValue()).subscribe({
      next: () => {
        this.loading.set(false);
        this.router.navigate(['/cursos'])
      },
      error: (error) => {
        this.loading.set(false);
      }
    });

  }

}
