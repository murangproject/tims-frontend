import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  ReactiveFormsModule,
  UntypedFormBuilder,
  Validators,
} from '@angular/forms';
import { AcademicYearService } from './data-access/academic-year.service';

@Component({
  selector: 'app-semester-management',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './semester-management.component.html',
})
export class SemesterManagementComponent implements OnInit {
  academicYears$ = this.academicYearService.getAcademicYears();

  form: any = {
    start_year: '',
    end_year: '',
  };

  tab: 'year' | 'term' = 'year';

  createAcademicYearModalState: boolean = false;
  deleteAcademicYearModalState: boolean = false;

  selectedId: number = -1;
  toastMessage: string = '';
  toastColor: boolean = false;
  toastModalState: boolean = false;

  constructor(
    private academicYearService: AcademicYearService,
    private formBuilder: UntypedFormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      start_year: [
        '',
        [Validators.required, Validators.min(1960), Validators.max(2099)],
      ],
      end_year: [
        '',
        [Validators.required, Validators.min(1960), Validators.max(2099)],
      ],
    });

    this.academicYearService.init();
  }

  select(id: number) {
    this.selectedId = id;
  }

  openCreateAcademicYearModal() {
    this.createAcademicYearModalState = true;
    this.form.reset();
  }

  closeCreateAcademicYearModal() {
    this.createAcademicYearModalState = false;
    this.form.reset();
    this.selectedId = -1;
  }

  openDeleteAcademicYearModal() {
    this.deleteAcademicYearModalState = true;
  }

  closeDeleteAcademicYearModal() {
    this.deleteAcademicYearModalState = false;
    this.form.reset();
    this.selectedId = -1;
  }

  onSubmitDeleteAcademicYear() {
    this.academicYearService.delete(this.selectedId).subscribe({
      next: () => {
        this.toastUtil('Delete academic year successfully', true);
        this.academicYearService.init();
        this.closeDeleteAcademicYearModal();
      },
      error: err => {
        this.toastUtil('Delete academic year failed', false);
        this.academicYearService.init();
        this.closeDeleteAcademicYearModal();
      },
    });
  }

  onSubmitCreateAcademicYear() {
    if (this.form.invalid) {
      return;
    }

    this.academicYearService.create(this.form.value).subscribe({
      next: () => {
        this.toastUtil('Create academic year successfully', true);
        this.academicYearService.init();
        this.closeCreateAcademicYearModal();
      },
      error: err => {
        this.toastUtil('Create academic year failed', false);
        this.academicYearService.init();
        this.closeCreateAcademicYearModal();
      },
    });
  }

  toastUtil(message: string, color: boolean) {
    this.toastMessage = message;
    this.toastColor = color;
    this.toastModalState = true;
  }
}
