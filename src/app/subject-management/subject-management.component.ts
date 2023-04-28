import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubjectService } from './data-access/subject.service';
import {
  FormsModule,
  ReactiveFormsModule,
  UntypedFormBuilder,
  Validators,
} from '@angular/forms';
import { map, of, shareReplay, switchMap, tap } from 'rxjs';
import { baseUrl } from '../shared/utils/api';

@Component({
  selector: 'app-subject-management',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './subject-management.component.html',
})
export class SubjectManagementComponent implements OnInit {
  subjects$ = this.subjectService
    .getSubjects()
    .pipe(shareReplay({ bufferSize: 1, refCount: true }));

  selectedSubject$ = this.subjects$.pipe(
    map(subjects =>
      subjects.filter(subject => subject.code !== this.selectedCode)
    )
  );

  prerequisites$ = this.subjects$.pipe(
    switchMap(subjects => of(subjects.find(s => s.code === this.selectedCode))),
    switchMap(subject =>
      this.selectedSubject$.pipe(
        map(subjects =>
          subjects.filter(s =>
            s.year_level && s.term && subject?.year_level && subject?.term
              ? subject?.year_level === s.year_level
                ? s.term < subject?.term
                  ? true
                  : false
                : s.year_level < subject?.year_level
                ? true
                : false
              : false
          )
        )
      )
    ),
    tap(subjects => console.log(subjects))
  );

  corequisites$ = this.subjects$.pipe(
    switchMap(subjects => of(subjects.find(s => s.code === this.selectedCode))),
    switchMap(subject =>
      this.selectedSubject$.pipe(
        map(subjects =>
          subjects.filter(
            s =>
              s.year_level === subject?.year_level && s.term === subject?.term
          )
        )
      )
    ),
    tap(subjects => console.log(subjects))
  );

  subjectForm: any = {
    code: '',
    title: '',
    description: '',
    units: '',
    hours: '',
    year_level: '',
    term: '',
    syllabus: '',
    prerequisite_code: '',
    corequisite_code: '',
  };

  syllabusForm: any = {
    syllabus: '',
  };

  createSubjectModalState: boolean = false;
  updateSubjectModalState: boolean = false;
  deleteSubjectModalState: boolean = false;
  uploadSyllabusModalState: boolean = false;
  selectedCode: string = '';

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
      description: [''],
      units: ['', [Validators.required, Validators.min(0), Validators.max(5)]],
      hours: [
        '',
        [Validators.required, Validators.min(0), Validators.max(999)],
      ],
      year_level: [
        '',
        [Validators.required, Validators.min(1), Validators.max(12)],
      ],
      term: ['', [Validators.required, Validators.min(1), Validators.max(4)]],
      syllabus: [''],
      prerequisite_code: [''],
      corequisite_code: [''],
    });

    this.syllabusForm = this.formBuilder.group({
      syllabus: ['', [Validators.required]],
    });

    this.subjectService.init();
  }

  selectSubject(code: string) {
    this.selectedCode = code;
    this.subjectService.init();
  }

  openCreateSubjectModal() {
    this.createSubjectModalState = true;
    this.subjectForm.reset();
  }

  closeCreateSubjectModal() {
    this.createSubjectModalState = false;
    this.subjectForm.reset();
    this.selectSubject('');
  }

  openUpdateSubjectModal() {
    this.updateSubjectModalState = true;
    this.subjects$
      .pipe(
        tap(subjects => {
          this.subjectForm.patchValue(
            subjects.find(subject => subject.code === this.selectedCode)
          );
        })
      )
      .subscribe();
  }

  closeUpdateSubjectModal() {
    this.updateSubjectModalState = false;
    this.subjectForm.reset();
    this.selectSubject('');
  }

  openDeleteSubjectModal() {
    this.deleteSubjectModalState = true;
  }

  closeDeleteSubjectModal() {
    this.deleteSubjectModalState = false;
    this.subjectForm.reset();
    this.selectSubject('');
  }

  onSubmitDeleteSubject() {
    this.subjectService.delete(this.selectedCode).subscribe({
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
        this.toastUtil('Create subject is successful', true);
        this.closeCreateSubjectModal();
      },
      error: err => {
        this.toastUtil('Create subject failed', false);
        this.closeCreateSubjectModal();
      },
    });
  }

  onSubmitUpdateSubject() {
    this.subjectService
      .update(this.selectedCode, this.subjectForm.value)
      .subscribe({
        next: res => {
          this.toastUtil('Update subject is successful', true);
          this.closeUpdateSubjectModal();
        },
        error: err => {
          this.toastUtil('Update subject failed', false);
          this.closeUpdateSubjectModal();
        },
      });
  }

  openUploadSyllabusModal() {
    this.uploadSyllabusModalState = true;
  }

  closeUploadSyllabusModal() {
    this.uploadSyllabusModalState = false;
  }

  onSubmitUploadSyllabus() {
    const formData = new FormData();
    formData.append('file', this.syllabusForm.get('syllabus').value);
    this.subjectService.uploadSyllabus(this.selectedCode, formData).subscribe({
      next: res => {
        this.toastUtil('Upload syllabus is successful', true);
        this.closeUploadSyllabusModal();
        this.syllabusForm.reset();
        this.subjectService.init();
      },
      error: err => {
        this.toastUtil('Upload syllabus failed', false);
        this.closeUploadSyllabusModal();
        this.syllabusForm.reset();
        this.subjectService.init();
      },
    });
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.syllabusForm.patchValue({
        syllabus: file,
      });
    }
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

  getLink(name: string) {
    return baseUrl + '/uploads/' + name;
  }
}
