import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  ReactiveFormsModule,
  UntypedFormBuilder,
  Validators,
} from '@angular/forms';
import { UserService } from './data-access/users.service';
import { Observable, catchError, map, of } from 'rxjs';
import { User } from './data-access/users.model';

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss'],
})
export class UserManagementComponent implements OnInit {
  formBuilder = inject(UntypedFormBuilder);
  userService = inject(UserService);

  activeUsers$: Observable<User[]> = this.userService.activeUsers$;
  invitedUsers$: Observable<User[]> = this.userService.invitedUsers$;

  form: any = {
    email: '',
    role_name: '',
    role_type: '',
  };

  selectedId: number = -1;

  tab: 'active' | 'invited' = 'active';
  invite_open: boolean = false;
  delete_open: boolean = false;
  toast: boolean = false;
  message: string = '';
  success: boolean = false;

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      role_name: ['', Validators.required],
      role_type: ['', Validators.required],
    });

    this.userService.getActive().subscribe();
    this.userService.getInvited().subscribe();
  }

  select(id: number) {
    this.selectedId = id;
  }

  edit() {
    console.log('edit');
  }

  delete() {
    this.userService.delete(this.selectedId).subscribe(
      () => {
        this.userService.getActive().subscribe();
        this.userService.getInvited().subscribe();
        this.delete_open = false;
        this.toastUtil('User deleted successfully', true);
      },
      err => {
        this.toastUtil('Failed to delete user', false);
        this.delete_open = false;
      }
    );
  }

  onSubmit() {
    if (this.form.valid) {
      this.userService
        .create(this.form.value)
        .pipe(
          map(res => {
            this.toastUtil('User invited successfully', true);
            return of(res);
          }),
          catchError(err => {
            this.toastUtil('Error inviting user', false);
            return of(err);
          })
        )
        .subscribe(() => {
          this.userService.getActive().subscribe();
          this.userService.getInvited().subscribe();
          this.form.reset();
          this.invite_open = false;
        });
    }
  }

  toastUtil(message: string, success: boolean) {
    this.toast = true;
    this.success = success;
    this.message = message;
    new Promise(resolve => setTimeout(resolve, 4000)).then(() => {
      this.toast = false;
      this.message = '';
    });
  }
}
