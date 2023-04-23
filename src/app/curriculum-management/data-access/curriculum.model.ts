export interface Curriculum {
  id?: number;
  code?: string;
  title?: string;
  description?: string;
  is_approved?: boolean;
  deleted?: boolean;
  created_at?: Date;
  updated_at?: Date;
}

export interface CreateCurriculumDto {
  code: string;
  title: string;
  description: string;
}

export interface UpdateCurriculumDto extends Partial<CreateCurriculumDto> {}
