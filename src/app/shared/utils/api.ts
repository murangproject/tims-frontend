const baseUrl = 'http://localhost:8000';

// Auth
const loginEndpoint = `${baseUrl}/api/login`;
const logoutEndpoint = `${baseUrl}/api/logout`;
const initAccountEndpoint = `${baseUrl}/api/init`;
const tokenValidationEndpoint = `${baseUrl}/api/validate-token`;

// User CRUD
const userEndpoint = `${baseUrl}/api/users`;

// Department CRUD
const departmentEndpoint = `${baseUrl}/api/departments`;

export {
  loginEndpoint,
  logoutEndpoint,
  initAccountEndpoint,
  tokenValidationEndpoint,
  userEndpoint,
  departmentEndpoint,
};
