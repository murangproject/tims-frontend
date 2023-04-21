import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, shareReplay, tap } from 'rxjs';
import { userEndpoint } from '../../shared/utils/api';
import { User, CreateUserDto, UpdateUserDto } from './users.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  activeUsers: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([{}]);
  invitedUsers: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([{}]);

  activeUsers$ = this.activeUsers
    .asObservable()
    .pipe(shareReplay({ bufferSize: 1, refCount: true }));
  invitedUsers$ = this.activeUsers
    .asObservable()
    .pipe(shareReplay({ bufferSize: 1, refCount: true }));

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
      .get<{ users: User[] }>(`${this.endpoint}/active`, { headers })
      .pipe(
        tap(res => {
          this.activeUsers.next(res.users);
        }),
        shareReplay({ bufferSize: 1, refCount: true })
      );
  }

  getInvited() {
    const headers = {
      Authorization: 'Bearer ' + localStorage.getItem('authToken'),
    };

    return this.http
      .get<{ users: User[] }>(`${this.endpoint}/invited`, { headers })
      .pipe(
        map(res => {
          return { ...res };
        }),
        tap(res => {
          this.invitedUsers.next(res.users);
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
