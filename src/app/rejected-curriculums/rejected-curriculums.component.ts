import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurriculumService } from '../curriculum-management/data-access/curriculum.service';
import { Router, RouterModule } from '@angular/router';
import { map } from 'rxjs';
import { CurriculumStatus } from '../curriculum-management/data-access/curriculum.model';
import { CurriculumCardComponent } from '../shared/components/curriculum-card.component';

@Component({
  selector: 'app-rejected-curriculums',
  standalone: true,
  imports: [CommonModule, RouterModule, CurriculumCardComponent],
  templateUrl: './rejected-curriculums.component.html',
  styleUrls: ['./rejected-curriculums.component.scss'],
})
export class RejectedCurriculumsComponent implements OnInit {
  curriculums$ = this.curriculumService
    .getCurriculums()
    .pipe(
      map(curriculums =>
        curriculums.filter(curriculum => curriculum.status === 'rejected')
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
}
