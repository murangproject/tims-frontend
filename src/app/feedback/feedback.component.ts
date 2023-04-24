import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { map } from 'rxjs';
import { Curriculum } from '../curriculum-management/data-access/curriculum.model';
import { CurriculumService } from '../curriculum-management/data-access/curriculum.service';
import { DepartmentService } from '../department-management/data-access/department.service';
import { CurriculumCardComponent } from '../shared/components/curriculum-card.component';

@Component({
  selector: 'app-feedback',
  standalone: true,
  imports: [CommonModule, CurriculumCardComponent, RouterModule],
  templateUrl: './feedback.component.html',
})
export class FeedbackComponent implements OnInit {
  departments$ = this.departmentService.getDepartments();
  curriculums$ = this.curriculumService
    .getCurriculums()
    .pipe(
      map((curriculums: Curriculum[]) =>
        curriculums.filter(cur =>
          cur ? cur.department?.name.includes(this.filter) : false
        )
      )
    );

  filter: string = '';

  createCurriculumModalState: boolean = false;

  constructor(
    private departmentService: DepartmentService,
    private curriculumService: CurriculumService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.departmentService.init();
    this.curriculumService.init();
  }

  giveFeedback(curriculum: Curriculum) {
    this.router.navigate([`admin/feedbacks/${curriculum.id}`]);
  }
}
