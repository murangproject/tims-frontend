import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, filter, map, tap } from 'rxjs';
import { Department } from './data-access/department.model';
import { DepartmentService } from './data-access/department.service';
import {
  FormsModule,
  ReactiveFormsModule,
  UntypedFormBuilder,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-department-management',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './department-management.component.html',
})
export class DepartmentManagementComponent implements OnInit {
  departments$ = this.departmentService.departments$;

  createOpen: boolean = false;
  updateOpen: boolean = false;
  deleteOpen: boolean = false;

  deleteId: number = -1;
  updateId: number = -1;

  // toast
  toastOpen: boolean = false;
  success: boolean = false;
  message: string = '';

  form: any = {
    code: '',
    name: '',
    description: '',
  };

  constructor(
    private departmentService: DepartmentService,
    private formBuilder: UntypedFormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      code: ['', [Validators.required]],
      name: ['', [Validators.required]],
      description: [''],
    });

    this.departmentService.getDepartments().subscribe();
  }

  onSubmit() {
    if (this.form.invalid) {
      return;
    }

    this.departmentService.createDepartment(this.form.value).subscribe(
      data => {
        this.toastUtil('Department created successfully', true);
        this.departmentService.getDepartments().subscribe();
      },
      err => {
        this.toastUtil('Department created failed', false);
      }
    );
    this.createOpen = false;
    this.form.reset();
  }

  setDeleteId(id: number) {
    this.deleteId = id;
  }

  setUpdateId(id: number, code: string, name: string, description: string) {
    this.updateId = id;
    this.form.patchValue({
      code: code,
      name: name,
      description: description,
    });
  }

  update() {
    if (this.form.invalid) {
      return;
    }

    this.departmentService
      .updateDepartment(this.updateId, this.form.value)
      .subscribe(data => {
        this.toastUtil('Department updated successfully', true);
        this.departmentService.getDepartments().subscribe();
      });

    this.form.reset();
    this.updateOpen = false;
  }

  delete() {
    this.departmentService.deleteDepartment({ id: this.deleteId }).subscribe(
      data => {
        this.toastUtil('Department deleted successfully', true);
        this.departmentService.getDepartments().subscribe();
      },
      err => {
        this.toastUtil('Department deleted failed', false);
      }
    );
    this.deleteOpen = false;
  }

  toastUtil(message: string, success: boolean) {
    this.toastOpen = true;
    this.success = success;
    this.message = message;
    new Promise(resolve => setTimeout(resolve, 4000)).then(() => {
      this.toastOpen = false;
      this.message = '';
    });
  }
}
