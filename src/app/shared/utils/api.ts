const baseUrl = 'http://localhost:8000';

// Auth
const loginApi = `${baseUrl}/api/login`;
const logoutApi = `${baseUrl}/api/logout`;
const initApi = `${baseUrl}/api/init`;
const validateTokenApi = `${baseUrl}/api/validate-token`;

// User CRUD
const createUserApi = `${baseUrl}/api/users`;
const activeUsersApi = `${baseUrl}/api/users/active`;
const invitedUsersApi = `${baseUrl}/api/users/invited`;
const deleteUserApi = `${baseUrl}/api/users`;

export {
  loginApi,
  logoutApi,
  initApi,
  validateTokenApi,
  createUserApi,
  activeUsersApi,
  invitedUsersApi,
  deleteUserApi,
};
