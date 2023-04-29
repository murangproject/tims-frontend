import { Component, OnInit } from '@angular/core';
import { CurriculumService } from '../curriculum-management/data-access/curriculum.service';
import {
  Curriculum,
  CurriculumStatus,
} from '../curriculum-management/data-access/curriculum.model';
import { map } from 'rxjs';
import { CurriculumCardComponent } from '../shared/components/curriculum-card.component';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-approved-curriculums',
  standalone: true,
  imports: [CommonModule, RouterModule, CurriculumCardComponent],
  templateUrl: './approved-curriculums.component.html',
})
export class ApprovedCurriculumsComponent implements OnInit {
  curriculums$ = this.curriculumService
    .getCurriculums()
    .pipe(
      map(curriculums =>
        curriculums.filter(curriculum => curriculum.status === 'approved')
      )
    );

  constructor(
    private curriculumService: CurriculumService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.curriculumService.init();
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

  onViewCurriculum(id: number) {
    this.router.navigate([`view-curriculums/${id}`]);
  }

  getLink(id: number) {
    return `/print-curriculum/${id}`;
  }
}
