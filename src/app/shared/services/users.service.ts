import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  activeUsersApi,
  createUserApi,
  deleteUserApi,
  invitedUsersApi,
} from '../utils/api';
import { BehaviorSubject, map, shareReplay, tap } from 'rxjs';

export interface UserModel {
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

@Injectable({
  providedIn: 'root',
})
export class UserService {
  activeUsers$: BehaviorSubject<UserModel[]> = new BehaviorSubject<UserModel[]>(
    [{}]
  );
  invitedUsers$: BehaviorSubject<UserModel[]> = new BehaviorSubject<
    UserModel[]
  >([{}]);

  constructor(private http: HttpClient) {}

  inviteUser(email: string, role_name: string, role_type: string) {
    const headers = {
      Authorization: 'Bearer ' + localStorage.getItem('authToken'),
    };

    const payload = {
      email,
      role_name,
      role_type,
    };

    return this.http.post<{ message: string }>(createUserApi, payload, {
      headers,
    });
  }

  getActiveUsers() {
    const headers = {
      Authorization: 'Bearer ' + localStorage.getItem('authToken'),
    };

    return this.http
      .get<{ users: UserModel[] }>(activeUsersApi, { headers })
      .pipe(
        tap(res => {
          console.log(res);
          this.activeUsers$.next(res.users);
        }),
        shareReplay({ bufferSize: 1, refCount: true })
      );
  }

  getInvitedUsers() {
    const headers = {
      Authorization: 'Bearer ' + localStorage.getItem('authToken'),
    };

    return this.http
      .get<{ users: UserModel[] }>(invitedUsersApi, { headers })
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

  deleteUser(id: number) {
    const headers = {
      Authorization: 'Bearer ' + localStorage.getItem('authToken'),
    };

    return this.http
      .delete<{ message: string }>(`${deleteUserApi}/${id}`, { headers })
      .pipe(
        tap(res => {
          console.log(res);
        }),
        shareReplay({ bufferSize: 1, refCount: true })
      );
  }
}
