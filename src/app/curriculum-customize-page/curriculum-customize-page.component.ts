import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { DepartmentService } from '../department-management/data-access/department.service';

@Component({
  selector: 'app-curriculum-customize-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './curriculum-customize-page.component.html',
})
export class CurriculumCustomizePageComponent implements OnInit {
  departments$ = this.departmentService.getDepartments();

  constructor(private departmentService: DepartmentService) {}

  ngOnInit(): void {
    this.departmentService.init();
  }
}
