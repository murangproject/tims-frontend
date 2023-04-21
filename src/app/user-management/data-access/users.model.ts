export interface User {
  id?: number;
  first_name?: string;
  middle_name?: string;
  last_name?: string;
  email?: string;
  role_name?: string;
  role_type?: string;
  created_at?: string;
  updated_at?: string;
}

export interface CreateUserDto {
  email: string;
  role_name: string;
  role_type: string;
}

export interface UpdateUserDto {
  first_name?: string;
  middle_name?: string;
  last_name?: string;
  email?: string;
  role_name?: string;
  role_type?: string;
  deleted?: boolean;
}
