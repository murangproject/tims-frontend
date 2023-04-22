export interface AcademicYear {
  id?: number;
  start_year?: string;
  end_year?: string;
  deleted?: boolean;
}

export interface AcademicYearResponse {
  academic_years: AcademicYear[];
}

export interface CreateAcademicYearDto {
  start_year: string;
  end_year: string;
}

export interface UpdateAcademicYearDto {
  start_year?: string;
  end_year?: string;
  deleted?: boolean;
}
