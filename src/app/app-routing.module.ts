import { NgModule } from '@angular/core';
import {
  ExtraOptions,
  PreloadAllModules,
  RouterModule,
  Routes,
} from '@angular/router';
import { AppComponent } from './app.component';
import { SidebarComponent } from './shared/layouts/sidebar.component';
import { authGuard } from './shared/guards/auth.guard';
import { roleGuard } from './shared/guards/role.guard';

const routerConfig: ExtraOptions = {
  preloadingStrategy: PreloadAllModules,
  scrollPositionRestoration: 'enabled',
};

const routes: Routes = [
  {
    path: '',
    component: AppComponent,
    children: [
      {
        path: 'login',
        title: 'Login Page',
        loadComponent: () =>
          import('./login/login.component').then(c => c.LoginComponent),
      },
      {
        path: 'forgot-password',
        title: 'Forgot Password',
        loadComponent: () =>
          import('./forgot-password/forgot-password.component').then(
            c => c.ForgotPasswordComponent
          ),
      },
      {
        path: 'reset-password/:token',
        title: 'Reset Password',
        loadComponent: () =>
          import('./reset-password/reset-password.component').then(
            c => c.ResetPasswordComponent
          ),
      },
      {
        path: 'logout',
        title: 'Logout Page',
        loadComponent: () =>
          import('./logout/logout.component').then(c => c.LogoutComponent),
      },
      {
        path: 'account-initialize',
        title: 'Account Initialize',
        loadComponent: () =>
          import('./account-initialize/account-initialize.component').then(
            c => c.AccountInitializeComponent
          ),
      },
      {
        path: 'admin',
        title: 'Admin Panel',
        component: SidebarComponent,
        canActivate: [authGuard],
        children: [
          {
            path: 'dashboard',
            title: 'Dashboard',
            data: { roles: ['admin', 'committee_chair'] },
            canMatch: [roleGuard],
            loadComponent: () =>
              import('./dashboard/dashboard.component').then(
                c => c.DashboardComponent
              ),
          },
          {
            path: 'user-management',
            title: 'User Management',
            data: { roles: ['admin'] },
            canMatch: [roleGuard],
            loadComponent: () =>
              import('./user-management/user-management.component').then(
                c => c.UserManagementComponent
              ),
          },
          {
            path: 'subject-management',
            title: 'Subject Management',
            data: { roles: ['admin', 'committee_chair', 'committee_member'] },
            canMatch: [roleGuard],
            loadComponent: () =>
              import('./subject-management/subject-management.component').then(
                c => c.SubjectManagementComponent
              ),
          },
          {
            path: 'semester-management',
            title: 'Semester Management',
            data: { roles: ['admin', 'committee_chair'] },
            canMatch: [roleGuard],
            loadComponent: () =>
              import(
                './semester-management/semester-management.component'
              ).then(c => c.SemesterManagementComponent),
          },
          {
            path: 'department-management',
            title: 'Department Management',
            data: { roles: ['admin', 'committee_chair'] },
            canMatch: [roleGuard],
            loadComponent: () =>
              import(
                './department-management/department-management.component'
              ).then(c => c.DepartmentManagementComponent),
          },
          {
            path: 'curriculum-management',
            title: 'Curriculum Management',
            data: { roles: ['admin', 'committee_chair', 'committee_member'] },
            canMatch: [roleGuard],
            loadComponent: () =>
              import(
                './curriculum-management/curriculum-management.component'
              ).then(c => c.CurriculumManagementComponent),
          },
          {
            path: 'curriculum-management/:id/edit',
            title: 'Edit Curriculum',
            data: { roles: ['admin', 'committee_chair', 'committee_member'] },
            canMatch: [roleGuard],
            loadComponent: () =>
              import(
                './curriculum-customize-page/curriculum-customize-page.component'
              ).then(c => c.CurriculumCustomizePageComponent),
          },
          {
            path: 'submitted-curriculums',
            title: 'Curriculums Under Review',
            data: {
              roles: [
                'admin',
                'committee_chair',
                'committee_member',
                'stakeholder',
              ],
            },
            canMatch: [roleGuard],
            loadComponent: () =>
              import('./feedback/feedback.component').then(
                c => c.FeedbackComponent
              ),
          },
          {
            path: 'view-curriculums/:id',
            data: {
              roles: [
                'admin',
                'committee_chair',
                'committee_member',
                'stakeholder',
              ],
            },
            canMatch: [roleGuard],
            title: 'Curriculum',
            loadComponent: () =>
              import('./view-curriculum/view-curriculum.component').then(
                c => c.ViewCurriculumComponent
              ),
          },
          {
            path: 'curriculums/:id',
            data: {
              roles: [
                'admin',
                'committee_chair',
                'committee_member',
                'stakeholder',
              ],
            },
            canMatch: [roleGuard],
            title: 'Curriculum Review',
            loadComponent: () =>
              import('./feedback-page/feedback-page.component').then(
                c => c.FeedbackPageComponent
              ),
          },
          {
            path: 'settings',
            title: 'Settings',
            loadComponent: () =>
              import('./settings/settings.component').then(
                c => c.SettingsComponent
              ),
          },
        ],
      },
      {
        path: 'print-curriculum/:id',
        title: 'Print Curriculum',
        loadComponent: () =>
          import('./print-curriculum/print-curriculum.component').then(
            c => c.PrintCurriculumComponent
          ),
      },
      {
        path: '',
        canActivate: [authGuard],
        component: SidebarComponent,
        children: [
          {
            path: 'profile',
            title: 'Profile',
            loadComponent: () =>
              import('./profile/profile.component').then(
                c => c.ProfileComponent
              ),
          },
          {
            path: 'approved-curriculums',
            title: 'Approved Curriculums',
            data: { roles: ['stakeholder'] },
            canMatch: [roleGuard],
            loadComponent: () =>
              import(
                './approved-curriculums/approved-curriculums.component'
              ).then(c => c.ApprovedCurriculumsComponent),
          },
          {
            path: 'rejected-curriculums',
            title: 'Rejected Curriculums',
            data: { roles: ['stakeholder'] },
            canMatch: [roleGuard],
            loadComponent: () =>
              import(
                './rejected-curriculums/rejected-curriculums.component'
              ).then(c => c.RejectedCurriculumsComponent),
          },
          {
            path: 'submitted-curriculums',
            title: 'Curriculums Under Review',
            data: { roles: ['stakeholder'] },
            canMatch: [roleGuard],
            loadComponent: () =>
              import('./feedback/feedback.component').then(
                c => c.FeedbackComponent
              ),
          },
          {
            path: 'view-curriculums/:id',
            title: 'Curriculum',
            data: { roles: ['stakeholder'] },
            canMatch: [roleGuard],
            loadComponent: () =>
              import('./view-curriculum/view-curriculum.component').then(
                c => c.ViewCurriculumComponent
              ),
          },
          {
            path: 'curriculums/:id',
            title: 'Curriculum Review',
            data: { roles: ['stakeholder'] },
            canMatch: [roleGuard],
            loadComponent: () =>
              import('./feedback-page/feedback-page.component').then(
                c => c.FeedbackPageComponent
              ),
          },
        ],
      },
      {
        path: '**',
        redirectTo: 'login',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, routerConfig)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
