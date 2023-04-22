export interface Subject {
  id?: number;
  code?: string;
  title?: string;
  lab_unit?: number;
  lec_unit?: number;
  description?: string;
  syllabus?: string;
}

export interface CreateSubjectDto {
  code: string;
  title: string;
  lab_unit: number;
  lec_unit: number;
  description: string;
  syllabus?: string;
}

export interface UpdateSubjectDto extends Partial<CreateSubjectDto> {}
