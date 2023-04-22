export interface User {
  id?: number;
  first_name?: string;
  middle_name?: string;
  last_name?: string;
  email?: string;
  role_name?: string;
  role_type?: 'admin' | 'committee_chair' | 'committee_member' | 'stakeholder';
  created_at?: string;
  updated_at?: string;
}

export interface UserReponse {
  users: User[];
}

export interface CreateUserDto {
  email: string;
  role_name: string;
  role_type: string;
}

export interface UpdateActiveUserDto {
  first_name?: string;
  middle_name?: string;
  last_name?: string;
  email?: string;
  role_name?: string;
  role_type?: string;
  deleted?: boolean;
}

export interface UpdateInvitedUserDto {
  email?: string;
  role_name?: string;
  role_type?: string;
}
