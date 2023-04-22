import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, shareReplay, tap } from 'rxjs';
import { academicYearEndpoint } from '../../shared/utils/api';
import {
  AcademicYear,
  AcademicYearResponse,
  CreateAcademicYearDto,
} from './academic-year.model';

@Injectable({
  providedIn: 'root',
})
export class AcademicYearService {
  academicYears$ = new BehaviorSubject<AcademicYear[]>([]);

  constructor(private http: HttpClient) {}

  init() {
    const headers = {
      Authorization: 'Bearer ' + localStorage.getItem('authToken'),
    };

    this.http
      .get<AcademicYear[]>(`${academicYearEndpoint}`, {
        headers,
      })
      .pipe(
        tap(res => {
          this.academicYears$.next(res);
        })
      )
      .subscribe();
  }

  getAcademicYears() {
    return this.academicYears$.asObservable().pipe(
      shareReplay({
        bufferSize: 1,
        refCount: true,
      })
    );
  }

  create(createAcademicYearDto: CreateAcademicYearDto) {
    const headers = {
      Authorization: 'Bearer ' + localStorage.getItem('authToken'),
    };

    const start = createAcademicYearDto.start_year.toString();
    const end = createAcademicYearDto.end_year.toString();

    return this.http.post<{ message: string }>(
      `${academicYearEndpoint}`,
      { start_year: start, end_year: end },
      { headers }
    );
  }

  update(academicYear: AcademicYear) {
    const headers = {
      Authorization: 'Bearer ' + localStorage.getItem('authToken'),
    };

    return this.http.put<AcademicYear>(
      `${academicYearEndpoint}/${academicYear.id}`,
      academicYear,
      { headers }
    );
  }

  delete(id: number) {
    const headers = {
      Authorization: 'Bearer ' + localStorage.getItem('authToken'),
    };

    return this.http.delete(`${academicYearEndpoint}/${id}`, {
      headers,
    });
  }
}
