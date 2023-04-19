import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  ReactiveFormsModule,
  UntypedFormBuilder,
  Validators,
} from '@angular/forms';
import { AuthService } from '../shared/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account-initialize',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './account-initialize.component.html',
})
export class AccountInitializeComponent implements OnInit {
  form: any = {
    firstName: '',
    middleName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  submitted: boolean = false;
  invalid: boolean = false;

  formBuilder = inject(UntypedFormBuilder);
  auth = inject(AuthService);
  router = inject(Router);

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      firstName: ['', Validators.required],
      middleName: '',
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });
  }

  onSubmit() {
    this.submitted = true;

    if (this.form.invalid) {
      this.invalid = true;
      return;
    }

    const data = this.form.value;

    if (data.password !== data.confirmPassword) {
      this.invalid = true;
      return;
    }

    this.auth
      .init(
        data.firstName,
        data.middleName,
        data.lastName,
        data.email,
        data.password,
        data.confirmPassword
      )
      .subscribe(
        () => {
          this.router.navigate(['/logout']);
        },
        error => {
          this.invalid = true;
        }
      );
  }
}
