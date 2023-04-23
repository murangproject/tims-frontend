import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurriculumCardComponent } from '../shared/components/curriculum-card.component';
import { DepartmentService } from '../department-management/data-access/department.service';
import { CurriculumService } from './data-access/curriculum.service';
import { Router } from '@angular/router';
import {
  FormsModule,
  ReactiveFormsModule,
  UntypedFormBuilder,
  Validators,
} from '@angular/forms';
import { ToastService } from '../shared/services/toast.service';

@Component({
  selector: 'app-curriculum-management',
  standalone: true,
  imports: [
    CommonModule,
    CurriculumCardComponent,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './curriculum-management.component.html',
})
export class CurriculumManagementComponent implements OnInit {
  departments$ = this.departmentService.getDepartments();
  curriculums$ = this.curriculumService.getCurriculums();

  form: any = {
    department_id: -1,
    code: '',
    title: '',
    description: '',
  };

  createCurriculumModalState: boolean = false;

  constructor(
    private departmentService: DepartmentService,
    private curriculumService: CurriculumService,
    private router: Router,
    private formBuilder: UntypedFormBuilder,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.formBuilder.group({
      department_id: [-1],
      code: ['', [Validators.required]],
      title: ['', [Validators.required]],
      description: [''],
    });

    this.departmentService.init();
    this.curriculumService.init();
  }

  openCreateCurriculumModal() {
    this.createCurriculumModalState = true;
  }

  closeCreateCurriculumModal() {
    this.createCurriculumModalState = false;
  }

  onSubmitCreateCurriculum() {
    if (this.form.invalid) return;

    this.curriculumService.create(this.form.value).subscribe({
      next: data => {
        this.toastService.showToast('Create curriculum successfully!', true);
        this.closeCreateCurriculumModal();
        this.form.reset();
      },
      error: error => {
        this.toastService.showToast('Create curriculum failed!', false);
        this.closeCreateCurriculumModal();
        this.form.reset();
      },
    });
  }
}
