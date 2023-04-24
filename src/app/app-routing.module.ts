import { NgModule } from '@angular/core';
import {
  ExtraOptions,
  PreloadAllModules,
  RouterModule,
  Routes,
} from '@angular/router';
import { AppComponent } from './app.component';
import { AuthGuardService } from './shared/guards/auth.guard';
import { SidebarComponent } from './shared/layouts/sidebar.component';

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
        canActivate: [AuthGuardService],
        children: [
          {
            path: 'dashboard',
            title: 'Dashboard',
            loadComponent: () =>
              import('./dashboard/dashboard.component').then(
                c => c.DashboardComponent
              ),
          },
          {
            path: 'user-management',
            title: 'User Management',
            loadComponent: () =>
              import('./user-management/user-management.component').then(
                c => c.UserManagementComponent
              ),
          },
          {
            path: 'subject-management',
            title: 'Subject Management',
            loadComponent: () =>
              import('./subject-management/subject-management.component').then(
                c => c.SubjectManagementComponent
              ),
          },
          {
            path: 'semester-management',
            title: 'Semester Management',
            loadComponent: () =>
              import(
                './semester-management/semester-management.component'
              ).then(c => c.SemesterManagementComponent),
          },
          {
            path: 'department-management',
            title: 'Department Management',
            loadComponent: () =>
              import(
                './department-management/department-management.component'
              ).then(c => c.DepartmentManagementComponent),
          },
          {
            path: 'curriculum-management',
            title: 'Curriculum Management',
            loadComponent: () =>
              import(
                './curriculum-management/curriculum-management.component'
              ).then(c => c.CurriculumManagementComponent),
          },
          {
            path: 'curriculum-management/:id',
            title: 'Edit Curriculum',
            loadComponent: () =>
              import(
                './curriculum-customize-page/curriculum-customize-page.component'
              ).then(c => c.CurriculumCustomizePageComponent),
          },
          {
            path: 'feedbacks',
            title: 'Feedbacks',
            loadComponent: () =>
              import('./feedback/feedback.component').then(
                c => c.FeedbackComponent
              ),
          },
          {
            path: 'feedbacks/:id',
            title: 'Feedbacks',
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
