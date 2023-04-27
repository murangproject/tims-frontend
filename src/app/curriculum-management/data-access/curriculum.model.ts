import { Department } from 'src/app/department-management/data-access/department.model';
import { Subject } from 'src/app/subject-management/data-access/subject.model';
import { CommentInfo } from './comment.model';

export enum CurriculumStatus {
  Draft = 'draft',
  Published = 'published',
  Approved = 'approved',
  Rejected = 'rejected',
  Review = 'review',
}

export interface Curriculum {
  id?: number;
  title?: string;
  status?: CurriculumStatus;
  description?: string;
  department?: Department;
  subjects?: Subject[];
  comments?: CommentInfo[];
}

export interface CreateCurriculumDto {
  title: string;
  description?: string;
  status?: CurriculumStatus;
  department_id: number;
  subject_ids: string[];
}

export interface UpdateCurriculumDto extends Partial<CreateCurriculumDto> { }
