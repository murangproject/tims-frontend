import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  ReactiveFormsModule,
  UntypedFormBuilder,
  Validators,
} from '@angular/forms';
import { AuthService } from '../shared/auth/auth.service';
import { Router } from '@angular/router';
import { UserService } from '../user-management/data-access/users.service';
import { ToastService } from '../shared/services/toast.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './profile.component.html',
})
export class ProfileComponent implements OnInit {
  form: any = {
    first_name: '',
    middle_name: '',
    last_name: '',
    email: '',
  };

  submitted: boolean = false;
  invalid: boolean = false;

  user = inject(UserService);
  formBuilder = inject(UntypedFormBuilder);
  auth = inject(AuthService);
  router = inject(Router);
  toast = inject(ToastService);

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      first_name: ['', Validators.required],
      middle_name: '',
      last_name: ['', Validators.required],
      email: ['', Validators.required],
    });

    this.auth.getProfile().subscribe(profile => {
      this.form.patchValue({
        first_name: profile?.first_name ?? '',
        middle_name: profile?.middle_name ?? '',
        last_name: profile?.last_name ?? '',
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

    this.auth.getProfile().subscribe(profile => {
      this.user.updateProfile(profile?.id ?? -1, this.form.value).subscribe({
        next: () => {
          this.toast.showToast('Profile updated successfully!', true);
          this.router.navigate(['/logout']);
        },
        error: () => {
          this.toast.showToast('Failed to update profile!', false);
        },
      });
    });
  }
}
