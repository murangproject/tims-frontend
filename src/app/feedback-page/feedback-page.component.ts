import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FeedbackCommentComponent } from '../feedback-comment/feedback-comment.component';
import {
  FormsModule,
  ReactiveFormsModule,
  UntypedFormBuilder,
  Validators,
} from '@angular/forms';
import { DepartmentService } from '../department-management/data-access/department.service';
import { SubjectService } from '../subject-management/data-access/subject.service';
import { Observable, map, reduce, switchMap, tap } from 'rxjs';
import { Subject } from '../subject-management/data-access/subject.model';
import { CurriculumService } from '../curriculum-management/data-access/curriculum.service';
import { Curriculum } from '../curriculum-management/data-access/curriculum.model';
import { AuthService } from '../shared/auth/auth.service';
import { CommentService } from '../curriculum-management/data-access/ comment.service';
import { ToastService } from '../shared/services/toast.service';

@Component({
  selector: 'app-feedback-page',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FeedbackCommentComponent,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './feedback-page.component.html',
})
export class FeedbackPageComponent implements OnInit {
  departments$ = this.departmentService.getDepartments();
  subjects$: Observable<Subject[]> = this.curriculumService
    .getCurriculums()
    .pipe(
      map(curriculums => curriculums.find(c => c.id === this.curriculum_id)),
      map(curriculum => curriculum?.subjects),
      switchMap(subjects =>
        this.subjectService
          .getSubjects()
          .pipe(
            map(allSubjects =>
              allSubjects.filter((s: Subject) =>
                subjects
                  ? subjects.findIndex((sub: Subject) => sub.code === s.code) >
                    -1
                  : false
              )
            )
          )
      ),
      map(subjects => subjects?.sort((a, b) => (a.term ?? 0) - (b.term ?? 0))),
      map(subjects =>
        subjects?.sort((a, b) => (a.year_level ?? 0) - (b.year_level ?? 0))
      ),
      tap(subjects => console.log(subjects))
    );

  yearTerm$ = this.subjects$.pipe(
    map(subjects =>
      subjects?.map(s => {
        return {
          year: s.year_level,
          term: s.term,
          unit: s.units,
        };
      })
    ),
    map(terms => {
      return terms?.map((term, index, self) => {
        return {
          year: term?.year,
          term: term?.term,
          unit: self
            ?.filter(t => t.year === term?.year && t.term === term?.term)
            .reduce((a, b) => a + (b?.unit ?? 0), 0),
        };
      });
    }),
    map(terms => {
      return terms?.filter((term, index, self) => {
        return (
          self.findIndex(
            t => t.year === term?.year && t.term === term?.term
          ) === index
        );
      });
    }),
    tap(terms => console.log(terms))
  );

  giveFeedbackModalState = false;

  curriculum$: Observable<Curriculum | undefined> | undefined = undefined;

  form: any = {
    content: '',
  };

  curriculum_id: number = -1;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: UntypedFormBuilder,
    private departmentService: DepartmentService,
    private subjectService: SubjectService,
    private curriculumService: CurriculumService,
    private authService: AuthService,
    private commentService: CommentService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      content: ['', [Validators.required]],
    });

    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.curriculum_id = parseInt(id);
        this.curriculum$ = this.curriculumService.getCurriculums().pipe(
          tap(curriculums => {
            const curriculum = curriculums.find(c =>
              c ? c.id === parseInt(id) : false
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
            const curriculum = curriculums.find(c => c.id === parseInt(id));
            return curriculum;
          }),
          tap(curriculum => console.log(curriculum))
        );
      }
    });

    this.departmentService.init();
    this.subjectService.init();
    this.curriculumService.init();
  }

  openGiveFeedbackModal() {
    this.giveFeedbackModalState = true;
  }

  closeGiveFeedbackModal() {
    this.giveFeedbackModalState = false;
    this.form.reset();
  }

  onSubmitGiveFeedbackModal() {
    console.log(this.form.value);
    if (this.form.invalid) return;

    const content = this.form.value.content;

    this.authService.getProfile().subscribe(profile => {
      if (profile) {
        this.commentService
          .create({
            content: content,
            curriculum_id: this.curriculum_id,
            user_id: profile.id ?? -1,
          })
          .subscribe({
            next: () => {
              this.toastService.showToast('Feedback sent!', true);
              this.form.reset();
              this.curriculumService.init();
            },
            error: () => {
              this.toastService.showToast('Failed to send feedback!', false);
              this.form.reset();
              this.curriculumService.init();
            },
          });
      }
    });

    this.closeGiveFeedbackModal();
  }
}
