import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { tap } from 'rxjs';
import { DepartmentService } from './data-access/department.service';
import {
  FormsModule,
  ReactiveFormsModule,
  UntypedFormBuilder,
  Validators,
} from '@angular/forms';
import { ToastService } from '../shared/services/toast.service';

@Component({
  selector: 'app-department-management',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './department-management.component.html',
})
export class DepartmentManagementComponent implements OnInit {
  departments$ = this.departmentService.getDepartments();
  archives$ = this.departmentService.getArchives();

  tab: 'active' | 'archive' = 'active';

  // Modal
  createDepartmentModalState: boolean = false;
  updateDepartmentModalState: boolean = false;
  deleteDepartmentModalState: boolean = false;

  selectedId: number = -1;

  form: any = {
    code: '',
    name: '',
    description: '',
  };

  constructor(
    private departmentService: DepartmentService,
    private formBuilder: UntypedFormBuilder,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      code: ['', [Validators.required]],
      name: ['', [Validators.required]],
      description: [''],
    });

    this.departmentService.init();
  }

  openCreateDepartmentModal() {
    this.createDepartmentModalState = true;
    this.form.reset();
  }

  closeCreateDepartmentModal() {
    this.createDepartmentModalState = false;
    this.form.reset();
    this.selectedId = -1;
  }

  openUpdateDepartmentModal() {
    this.updateDepartmentModalState = true;
    this.departments$
      .pipe(
        tap(departments => {
          this.form.patchValue(
            departments.find(department => department.id === this.selectedId)
          );
        })
      )
      .subscribe();
  }

  closeUpdateDepartmentModal() {
    this.updateDepartmentModalState = false;
    this.form.reset();
    this.selectedId = -1;
  }

  submitCreateDepartment() {
    if (this.form.invalid) {
      return;
    }

    this.departmentService.create(this.form.value).subscribe({
      next: () => {
        this.toastService.showToast('Department created successfully', true);
        this.departmentService.init();
        this.closeCreateDepartmentModal();
      },
      error: () => {
        this.toastService.showToast('Department creation failed', false);
        this.departmentService.init();
        this.closeCreateDepartmentModal();
      },
    });
  }

  submitUpdateDepartment() {
    if (this.form.invalid) {
      return;
    }

    this.departmentService.update(this.selectedId, this.form.value).subscribe({
      next: () => {
        this.toastService.showToast('Department updated successfully', true);
        this.departmentService.init();
        this.closeUpdateDepartmentModal();
      },
      error: () => {
        this.toastService.showToast('Department update failed', false);
        this.departmentService.init();
        this.closeUpdateDepartmentModal();
      },
    });
  }

  openDeleteDepartmentModal() {
    this.deleteDepartmentModalState = true;
  }

  closeDeleteDepartmentModal() {
    this.deleteDepartmentModalState = false;
    this.selectedId = -1;
  }

  submitDeleteDepartment() {
    this.departmentService.delete(this.selectedId).subscribe({
      next: () => {
        this.toastService.showToast('Department deleted successfully', true);
        this.departmentService.init();
        this.closeDeleteDepartmentModal();
      },
      error: () => {
        this.toastService.showToast('Department deletion failed', false);
        this.departmentService.init();
        this.closeDeleteDepartmentModal();
      },
    });
  }

  select(id: number) {
    this.selectedId = id;
  }

  restore() {
    this.departmentService.restore(this.selectedId).subscribe({
      next: () => {
        this.toastService.showToast('Department restored successfully', true);
        this.departmentService.init();
      },
      error: () => {
        this.toastService.showToast('Department restoration failed', false);
        this.departmentService.init();
      },
    });
  }
}
