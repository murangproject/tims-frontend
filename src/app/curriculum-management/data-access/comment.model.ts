import { User } from 'src/app/user-management/data-access/users.model';
import { Curriculum } from './curriculum.model';

export interface CommentInfo {
  id?: number;
  content?: string;
  user?: User;
  curriculum?: Curriculum;
  created_at?: string;
}

export interface CreateCommentDto {
  content: string;
  curriculum_id: number;
  user_id: number;
}
