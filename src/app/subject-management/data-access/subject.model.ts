export interface Subject {
  id?: number;
  code?: string;
  title?: string;
  description?: string;
  syllabus?: string;
}

export interface CreateSubjectDto {
  code: string;
  title: string;
  description: string;
  syllabus?: string;
}

export interface UpdateSubjectDto extends Partial<CreateSubjectDto> {}
