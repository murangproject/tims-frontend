// Create boiler plate for angular service

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, shareReplay, tap } from 'rxjs';
import {
  Department,
  CreateDepartmentDto,
  UpdateDepartmentDto,
  DeleteDepartmentDto,
} from './department.model';
import { departmentEndpoint } from 'src/app/shared/utils/api';

@Injectable({
  providedIn: 'root',
})
export class DepartmentService {
  private departments: BehaviorSubject<Department[]> = new BehaviorSubject<
    Department[]
  >([]);
  departments$ = this.departments
    .asObservable()
    .pipe(shareReplay({ bufferSize: 1, refCount: true }));

  constructor(private http: HttpClient) {}

  getDepartments(): Observable<Department[]> {
    const headers = {
      Authorization: 'Bearer ' + localStorage.getItem('authToken'),
    };
    return this.http
      .get<Department[]>(`${departmentEndpoint}`, { headers })
      .pipe(
        tap(res => {
          this.departments.next(res);
        }),
        shareReplay({ bufferSize: 1, refCount: true })
      );
  }

  createDepartment(createDepartmentDto: CreateDepartmentDto) {
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

  updateDepartment(id: number, updateDepartmentDto: UpdateDepartmentDto) {
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

  deleteDepartment(deleteDepartmentDto: DeleteDepartmentDto) {
    const headers = {
      Authorization: 'Bearer ' + localStorage.getItem('authToken'),
    };

    return this.http
      .delete<{ message: string }>(
        `${departmentEndpoint}/${deleteDepartmentDto.id}`,
        {
          headers,
        }
      )
      .pipe(shareReplay({ bufferSize: 1, refCount: true }));
  }
}
