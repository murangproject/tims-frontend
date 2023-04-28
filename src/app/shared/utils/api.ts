const baseUrl = 'https://curriculum-backend.server.redenvalerio.com';

// Auth
const loginEndpoint = `${baseUrl}/api/login`;
const logoutEndpoint = `${baseUrl}/api/logout`;
const initAccountEndpoint = `${baseUrl}/api/init`;
const tokenValidationEndpoint = `${baseUrl}/api/validate-token`;
const checkRoleEndpoint = `${baseUrl}/api/check-role`;

// User CRUD
const userEndpoint = `${baseUrl}/api/users`;
const profileEndpoint = `${baseUrl}/api/user`;

// Department CRUD
const departmentEndpoint = `${baseUrl}/api/departments`;

// Academic Year CRUD
const academicYearEndpoint = `${baseUrl}/api/academic-years`;

// Term CRUD
const termEndpoint = `${baseUrl}/api/terms`;

// Subject CRUD
const subjectEndpoint = `${baseUrl}/api/subjects`;

// Curriculum CRUD
const curriculumEndpoint = `${baseUrl}/api/curriculums`;

// Comment CRUD
const commentEndpoint = `${baseUrl}/api/comments`;

export {
  loginEndpoint,
  logoutEndpoint,
  initAccountEndpoint,
  tokenValidationEndpoint,
  checkRoleEndpoint,
  userEndpoint,
  departmentEndpoint,
  academicYearEndpoint,
  termEndpoint,
  subjectEndpoint,
  curriculumEndpoint,
  profileEndpoint,
  commentEndpoint,
  baseUrl,
};
