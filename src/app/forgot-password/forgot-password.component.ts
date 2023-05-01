import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, UntypedFormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../shared/auth/auth.service';
import { ToastService } from '../shared/services/toast.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './forgot-password.component.html',
  styles: [
  ]
})
export class ForgotPasswordComponent implements OnInit {
  form: any = {
    email: '',
  }

  constructor(private toast: ToastService, private auth: AuthService, private formBuilder: UntypedFormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onSubmit() {
    if (this.form.invalid) return;

    this.auth.sendResetPassword(this.form.value.email).subscribe(
      {
        next: () => {
          this.toast.showToast('Reset Password Link Sent. Please check your email', true);
          this.router.navigate(['/login']);
        },
        error: () => {
          this.toast.showToast('Error sending reset password link. Please try again', false);
        }
      }
    );
  }
}
