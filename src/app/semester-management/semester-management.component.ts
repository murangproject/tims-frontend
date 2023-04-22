import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  ReactiveFormsModule,
  UntypedFormBuilder,
  Validators,
} from '@angular/forms';
import { AcademicYearService } from './data-access/academic-year.service';
import { TermService } from './data-access/term.service';

@Component({
  selector: 'app-semester-management',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './semester-management.component.html',
})
export class SemesterManagementComponent implements OnInit {
  academicYears$ = this.academicYearService.getAcademicYears();
  terms$ = this.termService.getTerms();

  academicYearForm: any = {
    start_year: '',
    end_year: '',
  };

  termForm: any = {
    name: '',
  };

  tab: 'year' | 'term' = 'year';

  createAcademicYearModalState: boolean = false;
  deleteAcademicYearModalState: boolean = false;

  createTermModalState: boolean = false;
  deleteTermModalState: boolean = false;

  selectedAcademicYearId: number = -1;
  selectedTermId: number = -1;
  toastMessage: string = '';
  toastColor: boolean = false;
  toastModalState: boolean = false;

  constructor(
    private academicYearService: AcademicYearService,
    private termService: TermService,
    private formBuilder: UntypedFormBuilder
  ) {}

  ngOnInit(): void {
    this.academicYearForm = this.formBuilder.group({
      start_year: [
        '',
        [Validators.required, Validators.min(1960), Validators.max(2099)],
      ],
      end_year: [
        { value: '', disabled: true },
        [Validators.required, Validators.min(1960), Validators.max(2099)],
      ],
    });

    this.termForm = this.formBuilder.group({
      name: ['', [Validators.required]],
    });

    this.academicYearService.init();
    this.termService.init();
  }

  updateEndYear() {
    this.academicYearForm.patchValue({
      end_year: this.academicYearForm.value.start_year + 1,
    });
  }

  selectAcademicYear(id: number) {
    this.selectedAcademicYearId = id;
  }

  selectTerm(id: number) {
    this.selectedTermId = id;
  }

  openCreateAcademicYearModal() {
    this.createAcademicYearModalState = true;
    this.academicYearForm.reset();
  }

  closeCreateAcademicYearModal() {
    this.createAcademicYearModalState = false;
    this.academicYearForm.reset();
    this.selectedAcademicYearId = -1;
  }

  openDeleteAcademicYearModal() {
    this.deleteAcademicYearModalState = true;
  }

  closeDeleteAcademicYearModal() {
    this.deleteAcademicYearModalState = false;
    this.academicYearForm.reset();
    this.selectedAcademicYearId = -1;
  }

  onSubmitDeleteAcademicYear() {
    this.academicYearService.delete(this.selectedAcademicYearId).subscribe({
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
    if (this.academicYearForm.invalid) {
      return;
    }

    this.academicYearService
      .create(this.academicYearForm.getRawValue())
      .subscribe({
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

  openCreateTermModal() {
    this.createTermModalState = true;
    this.termForm.reset();
  }

  closeCreateTermModal() {
    this.createTermModalState = false;
    this.termForm.reset();
    this.selectedTermId = -1;
  }

  openDeleteTermModal() {
    this.deleteTermModalState = true;
  }

  closeDeleteTermModal() {
    this.deleteTermModalState = false;
    this.termForm.reset();
    this.selectedTermId = -1;
  }

  onSubmitCreateTerm() {
    if (this.termForm.invalid) {
      return;
    }

    this.termService.create(this.termForm.value).subscribe({
      next: () => {
        this.toastUtil('Create term successfully', true);
        this.termService.init();
        this.closeCreateTermModal();
      },
      error: err => {
        this.toastUtil('Create term failed', false);
        this.termService.init();
        this.closeCreateTermModal();
      },
    });
  }

  onSubmitDeleteTerm() {
    this.termService.delete(this.selectedTermId).subscribe({
      next: () => {
        this.toastUtil('Delete term successfully', true);
        this.termService.init();
        this.closeDeleteTermModal();
      },
      error: err => {
        this.toastUtil('Delete term failed', false);
        this.termService.init();
        this.closeDeleteTermModal();
      },
    });
  }

  toastUtil(message: string, color: boolean) {
    this.toastMessage = message;
    this.toastColor = color;
    this.toastModalState = true;
  }
}
