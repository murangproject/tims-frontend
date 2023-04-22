// Create boiler plate for angular service

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, shareReplay, tap } from 'rxjs';
import {
  Department,
  CreateDepartmentDto,
  UpdateDepartmentDto,
} from './department.model';
import { departmentEndpoint } from 'src/app/shared/utils/api';

@Injectable({
  providedIn: 'root',
})
export class DepartmentService {
  departments$ = new BehaviorSubject<Department[]>([]);
  archives$ = new BehaviorSubject<Department[]>([]);

  constructor(private http: HttpClient) {}

  init() {
    const headers = {
      Authorization: 'Bearer ' + localStorage.getItem('authToken'),
    };

    this.http
      .get<Department[]>(`${departmentEndpoint}`, { headers })
      .pipe(
        tap(res => {
          this.departments$.next(res);
        })
      )
      .subscribe();

    this.http
      .get<Department[]>(`${departmentEndpoint}/archives`, { headers })
      .pipe(
        tap(res => {
          this.archives$.next(res);
        })
      )
      .subscribe();
  }

  getArchives() {
    return this.archives$
      .asObservable()
      .pipe(shareReplay({ bufferSize: 1, refCount: true }));
  }

  getDepartments() {
    return this.departments$
      .asObservable()
      .pipe(shareReplay({ bufferSize: 1, refCount: true }));
  }

  restore(id: number) {
    const headers = {
      Authorization: 'Bearer ' + localStorage.getItem('authToken'),
    };

    return this.http.put<{ message: string }>(
      `${departmentEndpoint}/restore/${id}`,
      {},
      {
        headers,
      }
    );
  }

  create(createDepartmentDto: CreateDepartmentDto) {
    const headers = {
      Authorization: 'Bearer ' + localStorage.getItem('authToken'),
    };

    return this.http.post<{ message: string }>(
      `${departmentEndpoint}`,
      createDepartmentDto,
      {
        headers,
      }
    );
  }

  update(id: number, updateDepartmentDto: UpdateDepartmentDto) {
    const headers = {
      Authorization: 'Bearer ' + localStorage.getItem('authToken'),
    };

    return this.http.put<{ message: string }>(
      `${departmentEndpoint}/${id}`,
      updateDepartmentDto,
      {
        headers,
      }
    );
  }

  delete(id: number) {
    const headers = {
      Authorization: 'Bearer ' + localStorage.getItem('authToken'),
    };

    return this.http.delete<{ message: string }>(
      `${departmentEndpoint}/${id}`,
      {
        headers,
      }
    );
  }
}
