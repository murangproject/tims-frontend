import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, shareReplay, tap } from 'rxjs';
import {
  Curriculum,
  CreateCurriculumDto,
  UpdateCurriculumDto,
  CurriculumStatus,
} from './curriculum.model';
import { curriculumEndpoint } from 'src/app/shared/utils/api';

@Injectable({
  providedIn: 'root',
})
export class CurriculumService {
  curriculums$ = new BehaviorSubject<Curriculum[]>([]);

  constructor(private http: HttpClient) {}

  init() {
    const headers = {
      Authorization: 'Bearer ' + localStorage.getItem('authToken'),
    };

    this.http
      .get<Curriculum[]>(`${curriculumEndpoint}`, { headers })
      .pipe(tap(res => this.curriculums$.next(res)))
      .subscribe();
  }

  getCurriculums() {
    return this.curriculums$
      .asObservable()
      .pipe(shareReplay({ bufferSize: 1, refCount: true }));
  }

  create(createCurriculumDto: CreateCurriculumDto) {
    const headers = {
      Authorization: 'Bearer ' + localStorage.getItem('authToken'),
    };

    return this.http.post<{ message: string }>(
      `${curriculumEndpoint}`,
      { ...createCurriculumDto, status: CurriculumStatus.Draft },
      {
        headers,
      }
    );
  }

  update(id: number, updateCurriculumDto: UpdateCurriculumDto) {
    const headers = {
      Authorization: 'Bearer ' + localStorage.getItem('authToken'),
    };

    if (updateCurriculumDto.subject_ids) {
      this.http
        .post<{ message: string }>(
          `${curriculumEndpoint}/${id}/subjects`,
          { subject_ids: updateCurriculumDto.subject_ids },
          { headers }
        )
        .subscribe(res => console.log(res));
    }

    return this.http.put<{ message: string }>(
      `${curriculumEndpoint}/${id}`,
      updateCurriculumDto,
      {
        headers,
      }
    );
  }

  updateStatus(id: number, status: CurriculumStatus) {
    const headers = {
      Authorization: 'Bearer ' + localStorage.getItem('authToken'),
    };

    return this.http.put<{ message: string }>(
      `${curriculumEndpoint}/${id}/status`,
      { status },
      {
        headers,
      }
    );
  }

  delete(currentCurriculumId: number) {
    const headers = {
      Authorization: 'Bearer ' + localStorage.getItem('authToken'),
    };

    return this.http.delete<{ message: string }>(
      `${curriculumEndpoint}/${currentCurriculumId}`,
      { headers }
    );
  }
}
