import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../shared/auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule, UntypedFormBuilder, Validators } from '@angular/forms';
import { ToastService } from '../shared/services/toast.service';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './reset-password.component.html',
  styles: [
  ]
})
export class ResetPasswordComponent implements OnInit {

  form: any = {
    password: '',
    password_confirmation: '',
  }

  constructor(private auth: AuthService, private formBuilder: UntypedFormBuilder, private route: ActivatedRoute, private toast: ToastService, private router: Router) { }

  token: string = '';

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.token = params['token'];
    });

    this.form = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(8)]],
      password_confirmation: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  onSubmit() {
    if (this.form.invalid) return;

    this.auth.changeResetPassword(this.token, this.form.value).subscribe(
      {
        next: () => {
          this.toast.showToast('Password Reset Successfully', true);
          this.router.navigate(['/login']);
        },
        error: () => {
          this.toast.showToast('Error resetting password. Please try again', false);
        }
      }
    );
  }
}
