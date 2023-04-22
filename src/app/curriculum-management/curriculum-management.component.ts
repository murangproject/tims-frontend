import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurriculumCardComponent } from '../shared/components/curriculum-card.component';
import { DepartmentService } from '../department-management/data-access/department.service';

@Component({
  selector: 'app-curriculum-management',
  standalone: true,
  imports: [CommonModule, CurriculumCardComponent],
  templateUrl: './curriculum-management.component.html',
})
export class CurriculumManagementComponent implements OnInit {
  departments$ = this.departmentService.getDepartments();

  constructor(private departmentService: DepartmentService) {}

  ngOnInit(): void {
    this.departmentService.init();
  }
}
