import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubjectService } from './data-access/subject.service';
import {
  FormsModule,
  ReactiveFormsModule,
  UntypedFormBuilder,
  Validators,
} from '@angular/forms';
import { tap } from 'rxjs';

@Component({
  selector: 'app-subject-management',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './subject-management.component.html',
})
export class SubjectManagementComponent implements OnInit {
  subjects$ = this.subjectService.getSubjects();

  subjectForm: any = {
    code: '',
    title: '',
    lab_unit: '',
    lec_unit: '',
    description: '',
  };

  createSubjectModalState: boolean = false;
  updateSubjectModalState: boolean = false;
  deleteSubjectModalState: boolean = false;
  selectedId: number = -1;

  // Toast
  toastModalState: boolean = false;
  toastColor: boolean = false;
  toastMessage: string = '';

  constructor(
    private subjectService: SubjectService,
    private formBuilder: UntypedFormBuilder
  ) {}

  ngOnInit(): void {
    this.subjectForm = this.formBuilder.group({
      code: ['', [Validators.required]],
      title: ['', [Validators.required]],
      lab_unit: [
        '',
        [Validators.required, Validators.min(0), Validators.max(5)],
      ],
      lec_unit: [
        '',
        [Validators.required, Validators.min(0), Validators.max(5)],
      ],
      description: [''],
    });

    this.subjectService.init();
  }

  selectSubject(id: number) {
    this.selectedId = id;
  }

  openCreateSubjectModal() {
    this.createSubjectModalState = true;
    this.subjectForm.reset();
  }

  closeCreateSubjectModal() {
    this.createSubjectModalState = false;
    this.subjectForm.reset();
    this.selectSubject(-1);
  }

  openUpdateSubjectModal() {
    this.updateSubjectModalState = true;
    this.subjects$
      .pipe(
        tap(subjects => {
          this.subjectForm.patchValue(
            subjects.find(subject => subject.id === this.selectedId)
          );
        })
      )
      .subscribe();
  }

  closeUpdateSubjectModal() {
    this.updateSubjectModalState = false;
    this.subjectForm.reset();
    this.selectSubject(-1);
  }

  openDeleteSubjectModal() {
    this.deleteSubjectModalState = true;
  }

  closeDeleteSubjectModal() {
    this.deleteSubjectModalState = false;
    this.subjectForm.reset();
    this.selectSubject(-1);
  }

  onSubmitDeleteSubject() {
    this.subjectService.delete(this.selectedId).subscribe({
      next: res => {
        this.subjectService.init();
        this.toastUtil('Delete subject is successful', true);
        this.closeDeleteSubjectModal();
      },
      error: err => {
        this.subjectService.init();
        this.toastUtil('Delete subject failed', false);
        this.closeDeleteSubjectModal();
      },
    });
  }

  onSubmitCreateSubject() {
    this.subjectService.create(this.subjectForm.getRawValue()).subscribe({
      next: res => {
        this.subjectService.init();
        this.toastUtil('Create subject is successful', true);
        this.closeCreateSubjectModal();
      },
      error: err => {
        this.subjectService.init();
        this.toastUtil('Create subject failed', false);
        this.closeCreateSubjectModal();
      },
    });
  }

  onSubmitUpdateSubject() {
    this.subjectService
      .update(this.selectedId, this.subjectForm.value)
      .subscribe({
        next: res => {
          this.subjectService.init();
          this.toastUtil('Update subject is successful', true);
          this.closeUpdateSubjectModal();
        },
        error: err => {
          this.subjectService.init();
          this.toastUtil('Update subject failed', false);
          this.closeUpdateSubjectModal();
        },
      });
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
}
