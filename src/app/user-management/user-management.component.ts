import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  ReactiveFormsModule,
  UntypedFormBuilder,
  Validators,
} from '@angular/forms';
import { UserService } from './data-access/users.service';
import { catchError, map, of, tap } from 'rxjs';

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './user-management.component.html',
})
export class UserManagementComponent implements OnInit {
  activeUsers$ = this.userService.getActive();
  invitedUsers$ = this.userService.getInvited();

  inviteUserForm: any = {
    email: '',
    role_name: '',
    role_type: '',
  };

  activeUserForm: any = {
    email: '',
    first_name: '',
    middle_name: '',
    last_name: '',
    role_name: '',
    role_type: '',
  };

  // Select
  selectedId: number = -1;

  // Tabs
  tab: 'active' | 'invited' = 'active';

  // Modals
  createInviteUserModalState: boolean = false;
  deleteUserModalState: boolean = false;
  updateInvitedUserModalState: boolean = false;
  updateActiveUserModalState: boolean = false;

  // Toast
  toastModalState: boolean = false;
  toastMessage: string = '';
  toastColor: boolean = false;

  constructor(
    private userService: UserService,
    private formBuilder: UntypedFormBuilder
  ) {}

  ngOnInit(): void {
    this.inviteUserForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      role_name: ['', Validators.required],
      role_type: ['', Validators.required],
    });

    this.activeUserForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      first_name: ['', Validators.required],
      middle_name: [''],
      last_name: ['', Validators.required],
      role_name: ['', Validators.required],
      role_type: ['', Validators.required],
    });

    this.userService.init();
  }

  select(id: number) {
    this.selectedId = id;
  }

  openCreateInviteUserModal() {
    this.createInviteUserModalState = true;
    this.inviteUserForm.reset();
  }

  closeCreateInviteUserModal() {
    this.createInviteUserModalState = false;
    this.inviteUserForm.reset();
    this.selectedId = -1;
  }

  openDeleteUserModal() {
    this.deleteUserModalState = true;
  }

  closeDeleteUserModal() {
    this.deleteUserModalState = false;
    this.selectedId = -1;
  }

  openUpdateInviteUserModal() {
    this.updateInvitedUserModalState = true;
    this.invitedUsers$
      .pipe(
        tap(users =>
          this.inviteUserForm.patchValue(
            users.find(user => user.id === this.selectedId)
          )
        )
      )
      .subscribe();
  }

  closeUpdateInviteUserModal() {
    this.updateInvitedUserModalState = false;
    this.inviteUserForm.reset();
    this.selectedId = -1;
  }

  openUpdateActiveUserModal() {
    this.updateActiveUserModalState = true;
    this.activeUsers$
      .pipe(
        tap(users =>
          this.activeUserForm.patchValue(
            users.find(user => user.id === this.selectedId)
          )
        )
      )
      .subscribe();
  }

  closeUpdateActiveUserModal() {
    this.updateActiveUserModalState = false;
    this.activeUserForm.reset();
    this.selectedId = -1;
  }

  onSubmitCreateUser() {
    if (this.inviteUserForm.invalid) return;

    this.userService.create(this.inviteUserForm.value).subscribe({
      next: () => {
        this.toastUtil('User created successfully', true);
        this.userService.init();
        this.closeCreateInviteUserModal();
      },
      error: () => {
        this.toastUtil('User creation failed', false);
        this.userService.init();
        this.closeCreateInviteUserModal();
      },
    });
  }

  onSubmitUpdateInvitedUser() {
    if (this.inviteUserForm.invalid) return;

    this.userService
      .updateInvitedUser(this.selectedId, this.inviteUserForm.value)
      .subscribe({
        next: () => {
          this.toastUtil('User updated successfully', true);
          this.userService.init();
          this.closeUpdateInviteUserModal();
        },
        error: () => {
          this.toastUtil('User update failed', false);
          this.userService.init();
          this.closeUpdateInviteUserModal();
        },
      });
  }

  onSubmitUpdateActiveUser() {
    if (this.activeUserForm.invalid) return;

    this.userService
      .updateInvitedUser(this.selectedId, this.activeUserForm.value)
      .subscribe({
        next: () => {
          this.toastUtil('User updated successfully', true);
          this.userService.init();
          this.closeUpdateActiveUserModal();
        },
        error: () => {
          this.toastUtil('User update failed', false);
          this.userService.init();
          this.closeUpdateActiveUserModal();
        },
      });
  }

  deleteUser() {
    this.userService.delete(this.selectedId).subscribe({
      next: () => {
        this.toastUtil('User deleted successfully', true);
        this.userService.init();
        this.closeDeleteUserModal();
      },
      error: () => {
        this.toastUtil('User deletion failed', false);
        this.userService.init();
        this.closeDeleteUserModal();
      },
    });

    this.inviteUserForm.reset();
    this.activeUserForm.reset();
  }

  toastUtil(message: string, success: boolean) {
    this.toastModalState = true;
    this.toastColor = success;
    this.toastMessage = message;
    new Promise(resolve => setTimeout(resolve, 4000)).then(() => {
      this.toastModalState = false;
      this.toastMessage = '';
    });
  }

  getRoleName(role_type: string) {
    switch (role_type) {
      case 'admin':
        return 'Admin';
      case 'committee_chair':
        return 'Committee Chair';
      case 'committee_member':
        return 'Committee Member';
      case 'stakeholder':
        return 'Stakeholder';
      default:
        return 'Unknown';
    }
  }
}
