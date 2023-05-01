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
import { ToastService } from '../shared/services/toast.service';

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
  toastService = inject(ToastService);

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      firstName: ['', Validators.required],
      middleName: '',
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });

    this.auth.getProfile().subscribe(profile => {
      this.form.patchValue({
        email: profile?.email ?? '',
      });
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
      .initializeAccount(
        data.firstName,
        data.middleName,
        data.lastName,
        data.email,
        data.password,
        data.confirmPassword
      )
      .subscribe(
        () => {
          this.toastService.showToast('Account initialized successfully', true);
          this.router.navigate(['/logout']);
        },
        error => {
          this.toastService.showToast(error.error.message, false);
          this.invalid = true;
        }
      );
  }
}
