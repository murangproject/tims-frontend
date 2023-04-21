import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, shareReplay, tap } from 'rxjs';
import { userEndpoint } from '../utils/api';

export interface UserResponse {
  id?: number;
  first_name?: string;
  middle_name?: string;
  last_name?: string;
  email?: string;
  role_name?: string;
  role_type?: string;
  created_at?: string;
  updated_at?: string;
}

export interface CreateUserDto {
  email: string;
  role_name: string;
  role_type: string;
}

export interface UpdateUserDto {
  first_name?: string;
  middle_name?: string;
  last_name?: string;
  email?: string;
  role_name?: string;
  role_type?: string;
  deleted?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  activeUsers$: BehaviorSubject<UserResponse[]> = new BehaviorSubject<
    UserResponse[]
  >([{}]);
  invitedUsers$: BehaviorSubject<UserResponse[]> = new BehaviorSubject<
    UserResponse[]
  >([{}]);

  endpoint = userEndpoint;

  constructor(private http: HttpClient) {}

  create(createuserDto: CreateUserDto) {
    const headers = {
      Authorization: 'Bearer ' + localStorage.getItem('authToken'),
    };

    return this.http.post<{ message: string }>(
      `${this.endpoint}`,
      createuserDto,
      {
        headers,
      }
    );
  }

  getActive() {
    const headers = {
      Authorization: 'Bearer ' + localStorage.getItem('authToken'),
    };

    return this.http
      .get<{ users: UserResponse[] }>(`${this.endpoint}/active`, { headers })
      .pipe(
        tap(res => {
          console.log(res);
          this.activeUsers$.next(res.users);
        }),
        shareReplay({ bufferSize: 1, refCount: true })
      );
  }

  getInvited() {
    const headers = {
      Authorization: 'Bearer ' + localStorage.getItem('authToken'),
    };

    return this.http
      .get<{ users: UserResponse[] }>(`${this.endpoint}/invited`, { headers })
      .pipe(
        map(res => {
          return { ...res };
        }),
        tap(res => {
          console.log(res);
          this.invitedUsers$.next(res.users);
        }),
        shareReplay({ bufferSize: 1, refCount: true })
      );
  }

  delete(id: number) {
    const headers = {
      Authorization: 'Bearer ' + localStorage.getItem('authToken'),
    };

    return this.http
      .delete<{ message: string }>(`${this.endpoint}/${id}`, {
        headers,
      })
      .pipe(
        tap(res => {
          console.log(res);
        }),
        shareReplay({ bufferSize: 1, refCount: true })
      );
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    const headers = {
      Authorization: 'Bearer ' + localStorage.getItem('authToken'),
    };

    return this.http
      .put<{ message: string }>(`${this.endpoint}/${id}`, updateUserDto, {
        headers,
      })
      .pipe(
        tap(res => {
          console.log(res);
        }),
        shareReplay({ bufferSize: 1, refCount: true })
      );
  }
}
