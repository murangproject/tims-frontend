import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../shared/auth/auth.service';
import { CurriculumService } from '../curriculum-management/data-access/curriculum.service';
import { SubjectService } from '../subject-management/data-access/subject.service';
import { DepartmentService } from '../department-management/data-access/department.service';
import { UserService } from '../user-management/data-access/users.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  curriculum$ = this.curriculumService.getCurriculums();
  firstLetter: string = '';

  totalActiveUsers: number = 0;
  totalInvitedUsers: number = 0;
  totalUsers: number = this.totalActiveUsers + this.totalInvitedUsers;

  totalSubjects: number = 0;
  totalDepartments: number = 0;

  totalCurriculum: number = 0;
  drafts: number = 0;
  approved: number = 0;
  rejected: number = 0;
  review: number = 0;

  constructor(
    private authService: AuthService,
    private curriculumService: CurriculumService,
    private subjectService: SubjectService,
    private departmentService: DepartmentService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.authService.getProfile().subscribe(profile => {
      this.firstLetter =
        profile?.first_name !== undefined ? profile.first_name[0] : 'U';
    });

    this.curriculum$.subscribe(curriculums => {
      this.totalCurriculum = curriculums.length;
      this.drafts = curriculums.filter(
        curriculum => curriculum.status === 'draft'
      ).length;
      this.approved = curriculums.filter(
        curriculum => curriculum.status === 'approved'
      ).length;
      this.review = curriculums.filter(
        curriculum => curriculum.status === 'review'
      ).length;
      this.rejected = curriculums.filter(
        curriculum => curriculum.status === 'rejected'
      ).length;
    });

    this.subjectService.subjects$.subscribe(subjects => {
      this.totalSubjects = subjects.length;
    });

    this.departmentService.departments$.subscribe(departments => {
      this.totalDepartments = departments.length;
    });

    this.userService.activeUsers$.subscribe(users => {
      this.totalActiveUsers = users.length;
      this.updateTotalUsers();
    });

    this.userService.invitedUsers$.subscribe(users => {
      this.totalInvitedUsers = users.length;
      this.updateTotalUsers();
    });

    this.curriculumService.init();
    this.subjectService.init();
    this.departmentService.init();
    this.userService.init();
  }

  updateTotalUsers() {
    this.totalUsers = this.totalActiveUsers + this.totalInvitedUsers;
  }
}
