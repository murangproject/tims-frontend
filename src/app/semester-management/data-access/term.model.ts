export interface Term {
  id?: number;
  name?: string;
}

export interface TermResponse {
  terms: Term[];
}

export interface CreateTermDto {
  name: string;
}

export interface UpdateTermDto {
  name?: string;
  deleted?: boolean;
}
