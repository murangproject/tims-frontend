export interface Subject {
  code?: string;
  title?: string;
  description?: string;
  units?: number;
  hours?: number;
  year_level?: number;
  term?: number;
  syllabus?: string;
  prerequisite?: Subject;
  corequisite?: Subject;
}

export interface CreateSubjectDto {
  code: string;
  title: string;
  description?: string;
  units: number;
  hours: number;
  year_level: number;
  term: number;
  syllabus?: string;
  prerequisite_code?: string;
  corequisite_code?: string;
}

export interface UpdateSubjectDto extends Partial<CreateSubjectDto> {}
