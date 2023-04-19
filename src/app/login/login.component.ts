import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  ReactiveFormsModule,
  UntypedFormBuilder,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth/auth.service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
})
export class LoginComponent implements OnInit {
  invalid: boolean = false;

  form: any = {
    email: '',
    password: '',
    remember: false,
  };

  submitted: boolean = false;

  constructor(
    private auth: AuthService,
    private formBuilder: UntypedFormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      remember: false,
    });

    const remember = JSON.parse(localStorage.getItem('remember') || 'false');

    if (remember) {
      this.auth
        .checkAuthentication()
        .pipe(
          tap(auth => {
            if (auth) {
              if (this.auth.checkInitialization()) {
                this.router.navigate(['/account-initialize']);
                return;
              }
              this.router.navigate(['/admin']);
            } else {
              this.router.navigate(['/login']);
            }
          })
        )
        .subscribe(() => {});
    } else {
      const token = localStorage.getItem('authToken');
      if (token && token.length > 0) this.auth.logout();
      localStorage.removeItem('authToken');
    }
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.form.invalid) return;

    if (this.form.value.remember) {
      localStorage.setItem('remember', 'true');
    } else {
      localStorage.removeItem('remember');
    }

    this.auth.login(this.form.value.email, this.form.value.password).subscribe(
      () => {
        this.invalid = false;
        const initialization = this.auth.checkInitialization();

        if (initialization) {
          this.router.navigate(['/account-initialize']);
          return;
        }
        this.router.navigate(['/admin']);
      },
      error => {
        this.invalid = true;
      }
    );
  }
}
