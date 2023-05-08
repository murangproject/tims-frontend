# CICT - Curriculum Management System
## Project Folder/File Structure
```
├── src
│   ├── app
│   │   ├── app.component.html
│   │   ├── app.component.ts
│   │   ├── app.module.ts
│   │   ├── app-routing.module.ts
│   │   ├── shared
│   │   │   ├── auth
│   │   │   │   └── auth.service.ts
│   │   │   ├── components
│   │   │   │   ├── curriculum-card.component.html
│   │   │   │   └── curriculum-card.component.ts
│   │   │   ├── guards
│   │   │   │   ├── auth.guard.ts
│   │   │   │   └── role.guard.ts
│   │   │   ├── layouts
│   │   │   │   ├── menulist.ts
│   │   │   │   ├── sidebar.component.html
│   │   │   │   └── sidebar.component.ts
│   │   │   ├── services
│   │   │   │   ├── theme.service.ts
│   │   │   │   └── toast.service.ts
│   │   │   └── utils
│   │   │       └── api.ts
│   │   ├── account-initialize
│   │   │   ├── account-initialize.component.html
│   │   │   └── account-initialize.component.ts
│   │   ├── approved-curriculums
│   │   │   ├── approved-curriculums.component.html
│   │   │   └── approved-curriculums.component.ts
│   │   ├── curriculum-customize-page
│   │   │   ├── curriculum-customize-page.component.html
│   │   │   └── curriculum-customize-page.component.ts
│   │   ├── curriculum-management
│   │   │   ├── curriculum-management.component.html
│   │   │   ├── curriculum-management.component.ts
│   │   │   └── data-access
│   │   │       ├── comment.model.ts
│   │   │       ├── comment.service.ts
│   │   │       ├── curriculum.model.ts
│   │   │       └── curriculum.service.ts
│   │   ├── dashboard
│   │   │   ├── activity.model.ts
│   │   │   ├── activity.service.ts
│   │   │   ├── dashboard.component.html
│   │   │   └── dashboard.component.ts
│   │   ├── department-management
│   │   │   ├── data-access
│   │   │   │   ├── department.model.ts
│   │   │   │   └── department.service.ts
│   │   │   ├── department-management.component.html
│   │   │   └── department-management.component.ts
│   │   ├── feedback
│   │   │   ├── feedback.component.html
│   │   │   └── feedback.component.ts
│   │   ├── feedback-comment
│   │   │   ├── feedback-comment.component.html
│   │   │   └── feedback-comment.component.ts
│   │   ├── feedback-management
│   │   │   ├── feedback-management.component.html
│   │   │   └── feedback-management.component.ts
│   │   ├── feedback-page
│   │   │   ├── feedback-page.component.html
│   │   │   └── feedback-page.component.ts
│   │   ├── forgot-password
│   │   │   ├── forgot-password.component.html
│   │   │   └── forgot-password.component.ts
│   │   ├── login
│   │   │   ├── login.component.html
│   │   │   └── login.component.ts
│   │   ├── logout
│   │   │   ├── logout.component.html
│   │   │   └── logout.component.ts
│   │   ├── print-curriculum
│   │   │   ├── print-curriculum.component.html
│   │   │   └── print-curriculum.component.ts
│   │   ├── profile
│   │   │   ├── profile.component.html
│   │   │   └── profile.component.ts
│   │   ├── rejected-curriculums
│   │   │   ├── rejected-curriculums.component.html
│   │   │   └── rejected-curriculums.component.ts
│   │   ├── reset-password
│   │   │   ├── reset-password.component.html
│   │   │   └── reset-password.component.ts
│   │   ├── semester-management
│   │   │   ├── data-access
│   │   │   │   ├── academic-year.model.ts
│   │   │   │   ├── academic-year.service.ts
│   │   │   │   ├── term.model.ts
│   │   │   │   └── term.service.ts
│   │   │   ├── semester-management.component.html
│   │   │   └── semester-management.component.ts
│   │   ├── settings
│   │   │   ├── settings.component.html
│   │   │   └── settings.component.ts
│   │   ├── subject-management
│   │   │   ├── data-access
│   │   │   │   ├── subject.model.ts
│   │   │   │   └── subject.service.ts
│   │   │   ├── subject-management.component.html
│   │   │   └── subject-management.component.ts
│   │   ├── user-management
│   │   │   ├── data-access
│   │   │   │   ├── users.model.ts
│   │   │   │   └── users.service.ts
│   │   │   ├── user-management.component.html
│   │   │   └── user-management.component.ts
│   │   └── view-curriculum
│   │       ├── view-curriculum.component.html
│   │       └── view-curriculum.component.ts
│   ├── assets
│   │   └── icons
│   │       ├── CICT.png
│   │       ├── logo.svg
│   ├── environments
│   ├── favicon.ico
│   ├── index.html
│   ├── main.ts
│   └── styles.scss
├── tailwind.config.js
├── tsconfig.app.json
├── tsconfig.json
└── tsconfig.spec.json
```
## Routing
```
  -- Auths // these routes are for authentication
  'login'
  'logout'
  'account-initialize'
  
  -- Passwords // forgot password(email), reset password(new password, confirm password)
  'forgot-password' 
  'reset-password/:token'
  
  -- Protected Routes // these routes are for every role using the admin dashboard
  'admin/dashboard'
  'admin/user-management' 
  'admin/subject-management'
  'admin/semester-management'
  'admin/department-management'
  'admin/curriculum-management'
  'admin/curriculum-management/:id/edit'
  'admin/submitted-curriculums'
  'admin/view-curriculums/:id' 
  'admin/curriculums/:id'
  'admin/settings'
  
  -- Protected Routes // these routes are for stakeholders' view
  'approved-curriculums'
  'rejected-curriculums'
  'submitted-curriculums'
  'view-curriculums/:id'
  'curriculums/:id'
  
  -- Standalones
  'profile' // this is for all users to view and change their profile
  'print-curriculum/:id' // this is for printing specific curriculums in a clean format
  
  -- wildcard routes // always redirects to login page
  '**'
'
```
## Setup
  - The project uses **Angular 15** and heavily relies on the **standalone** feature.
  - The ui framework used is **tailwind css**
  - The tailwind library used is **daisyui**
