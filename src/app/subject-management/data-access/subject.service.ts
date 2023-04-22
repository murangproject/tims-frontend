import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, shareReplay, tap } from 'rxjs';
import { CreateSubjectDto, Subject, UpdateSubjectDto } from './subject.model';
import { subjectEndpoint } from 'src/app/shared/utils/api';

@Injectable({
  providedIn: 'root',
})
export class SubjectService {
  subjects$ = new BehaviorSubject<Subject[]>([]);

  constructor(private http: HttpClient) {}

  init() {
    const headers = {
      Authorization: 'Bearer ' + localStorage.getItem('authToken'),
    };

    this.http
      .get<Subject[]>(`${subjectEndpoint}`, {
        headers,
      })
      .pipe(
        tap(res => {
          this.subjects$.next(res);
        })
      )
      .subscribe();
  }

  getSubjects() {
    return this.subjects$.asObservable().pipe(
      shareReplay({
        bufferSize: 1,
        refCount: true,
      })
    );
  }

  create(CreateSubjectDto: CreateSubjectDto) {
    const headers = {
      Authorization: 'Bearer ' + localStorage.getItem('authToken'),
    };

    return this.http.post<{ message: string }>(
      `${subjectEndpoint}`,
      CreateSubjectDto,
      {
        headers,
      }
    );
  }

  update(id: number, updateSubjectDto: UpdateSubjectDto) {
    const headers = {
      Authorization: 'Bearer ' + localStorage.getItem('authToken'),
    };

    return this.http.put<{ message: string }>(
      `${subjectEndpoint}/${id}`,
      updateSubjectDto,
      {
        headers,
      }
    );
  }

  delete(id: number) {
    const headers = {
      Authorization: 'Bearer ' + localStorage.getItem('authToken'),
    };

    return this.http.delete<{ message: string }>(`${subjectEndpoint}/${id}`, {
      headers,
    });
  }
}
