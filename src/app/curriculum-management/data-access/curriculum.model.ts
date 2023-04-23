import { Department } from 'src/app/department-management/data-access/department.model';
import { Subject } from 'src/app/subject-management/data-access/subject.model';

export interface Curriculum {
  id?: number;
  title?: string;
  description?: string;
  department?: Department;
  subjects?: Subject[];
}

export interface CreateCurriculumDto {
  department_id: number;
  title: string;
  description?: string;
  subject_ids: string[];
}

export interface UpdateCurriculumDto extends Partial<CreateCurriculumDto> {}
