import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, shareReplay, tap } from 'rxjs';
import { Term, CreateTermDto, UpdateTermDto } from './term.model';
import { termEndpoint } from 'src/app/shared/utils/api';

@Injectable({
  providedIn: 'root',
})
export class TermService {
  terms$ = new BehaviorSubject<Term[]>([]);

  constructor(private http: HttpClient) {}

  init() {
    const headers = {
      Authorization: 'Bearer ' + localStorage.getItem('authToken'),
    };

    this.http
      .get<Term[]>(`${termEndpoint}`, {
        headers,
      })
      .pipe(
        tap(res => {
          this.terms$.next(res);
        })
      )
      .subscribe();
  }

  getTerms() {
    return this.terms$.asObservable().pipe(
      shareReplay({
        bufferSize: 1,
        refCount: true,
      })
    );
  }

  create(createTermDto: CreateTermDto) {
    const headers = {
      Authorization: 'Bearer ' + localStorage.getItem('authToken'),
    };

    return this.http.post<{ message: string }>(
      `${termEndpoint}`,
      createTermDto,
      { headers }
    );
  }

  update(updateTermDto: UpdateTermDto) {
    const headers = {
      Authorization: 'Bearer ' + localStorage.getItem('authToken'),
    };

    return this.http.put<{ message: string }>(
      `${termEndpoint}`,
      updateTermDto,
      { headers }
    );
  }

  delete(id: number) {
    const headers = {
      Authorization: 'Bearer ' + localStorage.getItem('authToken'),
    };

    return this.http.delete<{ message: string }>(`${termEndpoint}/${id}`, {
      headers,
    });
  }
}
