import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurriculumCardComponent } from '../shared/components/curriculum-card.component';
import { DepartmentService } from '../department-management/data-access/department.service';
import { CurriculumService } from './data-access/curriculum.service';
import { Router, RouterModule } from '@angular/router';
import {
  FormsModule,
  ReactiveFormsModule,
  UntypedFormBuilder,
  Validators,
} from '@angular/forms';
import { ToastService } from '../shared/services/toast.service';
import { map, tap } from 'rxjs';
import { Curriculum, CurriculumStatus } from './data-access/curriculum.model';

@Component({
  selector: 'app-curriculum-management',
  standalone: true,
  imports: [
    CommonModule,
    CurriculumCardComponent,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  templateUrl: './curriculum-management.component.html',
})
export class CurriculumManagementComponent implements OnInit {
  departments$ = this.departmentService.getDepartments();
  curriculums$ = this.curriculumService.getCurriculums().pipe(
    map((curriculums: Curriculum[]) =>
      curriculums.filter(cur =>
        cur ? cur.department?.name.includes(this.filter) : false
      )
    ),
    map((curriculums: Curriculum[]) =>
      curriculums.sort((a, b) =>
        a?.status !== undefined && b?.status !== undefined
          ? a.status.localeCompare(b.status)
          : 0
      )
    )
  );

  form: any = {
    department_id: '',
    title: '',
    description: '',
  };

  filter: string = '';

  createCurriculumModalState: boolean = false;

  constructor(
    private departmentService: DepartmentService,
    private curriculumService: CurriculumService,
    private router: Router,
    private formBuilder: UntypedFormBuilder,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      department_id: ['', [Validators.required]],
      title: ['', [Validators.required]],
      description: [''],
    });

    this.departmentService.init();
    this.curriculumService.init();
  }

  filterDepartment(select: string) {
    this.filter = select;
    this.curriculumService.init();
  }

  openCreateCurriculumModal() {
    this.createCurriculumModalState = true;
  }

  closeCreateCurriculumModal() {
    this.createCurriculumModalState = false;
    this.form.reset();
  }

  onSubmitCreateCurriculum() {
    if (this.form.invalid) return;

    this.curriculumService.create(this.form.value).subscribe({
      next: data => {
        this.toastService.showToast('Create curriculum successfully!', true);
        this.closeCreateCurriculumModal();
        this.curriculumService.init();
      },
      error: error => {
        this.toastService.showToast('Create curriculum failed!', false);
        this.closeCreateCurriculumModal();
        this.curriculumService.init();
      },
    });
  }

  onEditCurriculum(id: number) {
    this.router.navigate([`admin/curriculum-management/${id}/edit`]);
  }

  onViewCurriculum(id: number) {
    this.router.navigate([`admin/curriculums/${id}`]);
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

  getLink(id: number) {
    return `/print-curriculum/${id}`;
  }
}
