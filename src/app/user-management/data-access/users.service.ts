import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  BehaviorSubject,
  Observable,
  map,
  shareReplay,
  switchMap,
  tap,
} from 'rxjs';
import { userEndpoint } from '../../shared/utils/api';
import {
  User,
  CreateUserDto,
  UpdateActiveUserDto,
  UserReponse,
  UpdateInvitedUserDto,
} from './users.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  activeUsers$ = new BehaviorSubject<User[]>([]);
  invitedUsers$ = new BehaviorSubject<User[]>([]);

  endpoint = userEndpoint;

  constructor(private http: HttpClient) {}

  init() {
    const header = {
      Authorization: 'Bearer ' + localStorage.getItem('authToken'),
    };

    this.http
      .get<UserReponse>(`${this.endpoint}/active`, { headers: header })
      .pipe(
        map(res => res.users),
        tap((res: User[]) => this.activeUsers$.next(res))
      )
      .subscribe();

    this.http
      .get<UserReponse>(`${this.endpoint}/invited`, { headers: header })
      .pipe(
        map(res => res.users),
        tap((res: User[]) => this.invitedUsers$.next(res))
      )
      .subscribe();
  }

  getActive(): Observable<User[]> {
    return this.activeUsers$
      .asObservable()
      .pipe(shareReplay({ bufferSize: 1, refCount: true }));
  }

  getInvited(): Observable<User[]> {
    return this.invitedUsers$
      .asObservable()
      .pipe(shareReplay({ bufferSize: 1, refCount: true }));
  }

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

  delete(id: number) {
    const headers = {
      Authorization: 'Bearer ' + localStorage.getItem('authToken'),
    };

    return this.http.delete<{ message: string }>(`${this.endpoint}/${id}`, {
      headers,
    });
  }

  updateActiveUser(id: number, updateUserDto: UpdateActiveUserDto) {
    const headers = {
      Authorization: 'Bearer ' + localStorage.getItem('authToken'),
    };

    return this.http.put<{ message: string }>(
      `${this.endpoint}/${id}`,
      updateUserDto,
      {
        headers,
      }
    );
  }

  updateInvitedUser(id: number, updateUserDto: UpdateInvitedUserDto) {
    const headers = {
      Authorization: 'Bearer ' + localStorage.getItem('authToken'),
    };

    return this.http.put<{ message: string }>(
      `${this.endpoint}/${id}`,
      updateUserDto,
      {
        headers,
      }
    );
  }
}
