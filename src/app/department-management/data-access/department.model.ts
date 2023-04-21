export interface Department {
  id: number;
  code: string;
  name: string;
  description: string;
  deleted: boolean;
}

export interface CreateDepartmentDto {
  code: string;
  name: string;
  description: string;
}

export interface UpdateDepartmentDto {
  code: string;
  name: string;
  description: string;
}

export interface DeleteDepartmentDto {
  id: number;
}
