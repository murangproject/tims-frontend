import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { DepartmentService } from '../department-management/data-access/department.service';
import {
  Curriculum,
  CurriculumStatus,
} from '../curriculum-management/data-access/curriculum.model';
import { Observable, map, switchMap, take, tap } from 'rxjs';
import { CurriculumService } from '../curriculum-management/data-access/curriculum.service';
import { SubjectService } from '../subject-management/data-access/subject.service';
import {
  FormsModule,
  ReactiveFormsModule,
  UntypedFormBuilder,
} from '@angular/forms';
import { Subject } from '../subject-management/data-access/subject.model';
import { ToastService } from '../shared/services/toast.service';

@Component({
  selector: 'app-curriculum-customize-page',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
  templateUrl: './curriculum-customize-page.component.html',
})
export class CurriculumCustomizePageComponent implements OnInit {
  departments$ = this.departmentService.getDepartments();
  subjects$ = this.subjectService.getSubjects().pipe(
    map(subjects => subjects.sort((a, b) => (a.term ?? 0) - (b.term ?? 0))),
    map(subjects =>
      subjects.sort((a, b) => (a.year_level ?? 0) - (b.year_level ?? 0))
    )
  );
  year_levels$ = this.subjects$.pipe(
    map(subjects => [...new Set(subjects.map(s => s.year_level))])
  );
  terms$ = this.subjects$.pipe(
    map(subjects => [...new Set(subjects.map(s => s.term))])
  );
  selectedSubjects$ = this.subjects$.pipe(
    tap(subjects => console.log(subjects)),
    map(subjects =>
      subjects.filter(s => this.form.value.subject_ids.includes(s.code))
    ),
    tap(subjects => console.log(subjects))
  );

  form: any = {
    title: '',
    description: '',
    subject_ids: [],
  };

  currentCurriculumId: number = -1;

  deleteCurriculumModalState: boolean = false;
  submitForReviewModalState: boolean = false;

  curriculum$?: Observable<Curriculum | undefined>;

  constructor(
    private curriculumService: CurriculumService,
    private subjectService: SubjectService,
    private departmentService: DepartmentService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: UntypedFormBuilder,
    private toastService: ToastService
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      title: [''],
      description: [''],
      subject_ids: [[]],
    });

    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.currentCurriculumId = parseInt(id);
        this.curriculum$ = this.curriculumService.getCurriculums().pipe(
          tap(curriculums => {
            const curriculum = curriculums.find(c =>
              c ? c.id === this.currentCurriculumId : false
            );
            if (curriculum) {
              this.form.patchValue({
                title: curriculum?.title,
                description: curriculum?.description,
              });
              if (curriculum?.subjects) {
                this.form.patchValue({
                  subject_ids: curriculum?.subjects.map(s => s.code) ?? [],
                });
              }
            }
          }),
          map(curriculums => {
            const curriculum = curriculums.find(
              c => c.id === this.currentCurriculumId
            );
            return curriculum;
          })
        );
      }
    });

    this.curriculumService.init();
    this.departmentService.init();
    this.subjectService.init();
  }

  onCheckboxChange(data: any) {
    const { event, subject } = data;
    const { corequisite, prerequisite } = subject;
    if (!subject) return;

    if (
      event.target.checked &&
      !this.form.value.subject_ids.includes(subject.code)
    ) {
      this.form.patchValue({
        subject_ids: [...this.form.value.subject_ids, subject.code],
      });

      if (
        corequisite?.code &&
        !this.form.value.subject_ids.includes(corequisite.code)
      ) {
        this.form.patchValue({
          subject_ids: [...this.form.value.subject_ids, corequisite.code],
        });

        this.onCodeChecked({ code: corequisite.code });
      }

      if (
        prerequisite?.code &&
        !this.form.value.subject_ids.includes(prerequisite.code)
      ) {
        this.form.patchValue({
          subject_ids: [...this.form.value.subject_ids, prerequisite.code],
        });

        this.onCodeChecked({ code: prerequisite.code });
      }
    } else if (
      !event.target.checked &&
      this.form.value.subject_ids.includes(subject.code)
    ) {
      this.form.patchValue({
        subject_ids: this.form.value.subject_ids.filter(
          (s: string) => s !== subject.code
        ),
      });

      this.onCodeUnchecked({ code: subject.code });
    }
  }

  onCodeUnchecked(data: any) {
    const { code } = data;
    if (!code) return;

    this.subjects$
      .pipe(
        map(s => s.find(s => s.prerequisite?.code === code)),
        take(1),
        tap(subject =>
          subject
            ? this.onCheckboxChange({
              event: { target: { checked: false } },
              subject,
            })
            : null
        )
      )
      .subscribe();

    this.subjects$
      .pipe(
        map(s => s.find(s => s.corequisite?.code === code)),
        take(1),
        tap(subject =>
          subject
            ? this.onCheckboxChange({
              event: { target: { checked: false } },
              subject,
            })
            : null
        )
      )
      .subscribe();
  }

  onCodeChecked(data: any) {
    const { code } = data;
    if (!code) return;
    this.subjects$
      .pipe(
        switchMap(subjects =>
          this.subjects$.pipe(
            map(s => s.find(s => s.code === code)),
            take(1),
            tap(subject =>
              subject?.corequisite
                ? this.onCheckboxChange({
                  event: { target: { checked: true } },
                  subject: subjects.find(
                    s => s.code === subject?.corequisite?.code
                  ),
                })
                : null
            ),
            tap(subject =>
              subject?.prerequisite
                ? this.onCheckboxChange({
                  event: { target: { checked: true } },
                  subject: subjects.find(
                    s => s.code === subject?.prerequisite?.code
                  ),
                })
                : null
            )
          )
        )
      )
      .subscribe();
  }

  checkIfChecked(subject: Subject) {
    const check =
      this.form.value.subject_ids.findIndex((s: string) => s === subject.code) >
      -1;
    return check;
  }

  onSubmitUpdateCurriculum() {
    if (this.form.invalid) return;

    const { title, description, subject_ids } = this.form.value;
    this.curriculumService
      .update(this.currentCurriculumId, {
        title,
        description,
        subject_ids,
      })
      .subscribe({
        next: () => {
          this.toastService.showToast('Curriculum updated successfully', true);
          this.curriculumService.init();
          this.departmentService.init();
          this.subjectService.init();
          this.router.navigate(['/admin/curriculum-management']);
        },
        error: () => {
          this.toastService.showToast('Failed to update curriculum', false);
          this.curriculumService.init();
          this.departmentService.init();
          this.subjectService.init();
        },
      });
  }

  openDeleteCurriculumModal() {
    this.deleteCurriculumModalState = true;
  }

  closeDeleteCurriculumModal() {
    this.deleteCurriculumModalState = false;
  }

  onSubmitDeleteCurriculum() {
    this.curriculumService.delete(this.currentCurriculumId).subscribe({
      next: () => {
        this.toastService.showToast('Curriculum deleted successfully', true);
        this.router.navigate(['/admin/curriculum-management']);
      },
      error: () => {
        this.toastService.showToast('Failed to delete curriculum', false);
      },
    });
  }

  openSubmitForReviewCurriculum() {
    this.submitForReviewModalState = true;
  }

  closeSubmitForReviewCurriculum() {
    this.submitForReviewModalState = false;
  }

  onSubmitForReviewCurriculum() {
    this.curriculumService
      .updateStatus(this.currentCurriculumId ?? -1, CurriculumStatus.Review)
      .subscribe({
        next: () => {
          this.toastService.showToast(
            'Curriculum submitted for review successfully',
            true
          );
          this.router.navigate(['/admin/curriculum-management']);
        },
        error: () => {
          this.toastService.showToast(
            'Failed to submit curriculum for review',
            false
          );
          this.router.navigate(['/admin/curriculum-management']);
        },
      });
  }

  getBadgeStatusColor(status?: CurriculumStatus) {
    switch (status) {
      case 'draft':
        return 'badge-ghost text-ghost-content';
      case 'published':
        return 'badge-info text-info-content';
      case 'approved':
        return 'badge-success text-success-content';
      case 'rejected':
        return 'badge-error text-error-content';
      case 'review':
        return 'badge-warning text-warning-content';
      default:
        return 'badge-ghost text-ghost-content';
    }
  }

  getStatusText(status?: CurriculumStatus) {
    switch (status) {
      case 'draft':
        return 'Draft';
      case 'published':
        return 'Published';
      case 'approved':
        return 'Approved';
      case 'rejected':
        return 'Rejected';
      case 'review':
        return 'Under Review';
      default:
        return 'Draft';
    }
  }
}
