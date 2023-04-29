export interface SideNavItem {
  label: string;
  link: string;
}

export const TopSideNavItems = {
  admin: [
    {
      label: 'Dashboard',
      link: '/admin/dashboard',
    },
    {
      label: 'User Management',
      link: '/admin/user-management',
    },
    {
      label: 'Curriculum Management',
      link: '/admin/curriculum-management',
    },
    {
      label: 'Subject Management',
      link: '/admin/subject-management',
    },
    {
      label: 'Department Management',
      link: '/admin/department-management',
    },
  ],
  committee_chair: [
    {
      label: 'Dashboard',
      link: '/admin/dashboard',
    },
    {
      label: 'Curriculum Management',
      link: '/admin/curriculum-management',
    },
    {
      label: 'Subject Management',
      link: '/admin/subject-management',
    },
    {
      label: 'Department Management',
      link: '/admin/department-management',
    },
  ],
  committee_member: [
    {
      label: 'Curriculum Management',
      link: '/admin/curriculum-management',
    },
    {
      label: 'Subject Management',
      link: '/admin/subject-management',
    },
  ],
  stakeholder: [
    {
      label: 'Submitted For Review',
      link: '/submitted-curriculums',
    },
    {
      label: 'Approved Curriculums',
      link: '/approved-curriculums',
    },
    {
      label: 'Rejected Curriculums',
      link: '/rejected-curriculums',
    },
  ],
};

export const BottomSideNavItems = {
  admin: [
    {
      label: 'Submitted For Review',
      link: '/admin/submitted-curriculums',
    },
    {
      label: 'Settings',
      link: '/admin/settings',
    },
  ],
  committee_chair: [
    {
      label: 'Submitted For Review',
      link: '/admin/submitted-curriculums',
    },
    {
      label: 'Settings',
      link: '/admin/settings',
    },
  ],
  committee_member: [
    {
      label: 'Submitted For Review',
      link: '/admin/submitted-curriculums',
    },
    {
      label: 'Settings',
      link: '/admin/settings',
    },
  ],
  stakeholder: [
    {
      label: 'Settings',
      link: '/admin/settings',
    },
  ],
};
