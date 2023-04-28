import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map, share, shareReplay, tap } from 'rxjs/operators';
import {
  baseUrl,
  checkRoleEndpoint,
  initAccountEndpoint,
  loginEndpoint,
  logoutEndpoint,
  profileEndpoint,
  tokenValidationEndpoint,
} from '../utils/api';
import { User } from 'src/app/user-management/data-access/users.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticated = new BehaviorSubject<boolean>(false);
  isAuthenticated$ = this.isAuthenticated
    .asObservable()
    .pipe(shareReplay({ bufferSize: 1, refCount: true }));

  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    const loginPayload = { email, password };

    this.http.get(`${baseUrl}/sanctum/csrf-cookie`).subscribe();

    return this.http
      .post<{ user: User; token: string; initialize: boolean }>(
        `${loginEndpoint}`,
        loginPayload
      )
      .pipe(
        tap(response => {
          localStorage.setItem(
            'initialize',
            response.initialize?.toString() ?? 'false'
          );
          localStorage.setItem('authToken', response.token);
          localStorage.setItem('role', response.user.role_type ?? '');
          localStorage.setItem(
            'fullName',
            `${response.user.first_name} ${response.user.last_name}`
          );
          this.isAuthenticated.next(true);
        }),
        shareReplay({ bufferSize: 1, refCount: true })
      );
  }

  logout() {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem('authToken')}`,
    };

    localStorage.removeItem('initialize');
    localStorage.removeItem('authToken');
    localStorage.removeItem('role');
    localStorage.removeItem('fullName');

    this.http.post(`${logoutEndpoint}`, {}, { headers }).subscribe(() => {
      localStorage.removeItem('initialize');
      localStorage.removeItem('authToken');
      this.isAuthenticated.next(false);
    });
  }

  initializeAccount(
    firstName: string,
    middleName: string,
    lastName: string,
    email: string,
    password: string,
    confirmPassword: string
  ) {
    const initPayload = {
      first_name: firstName,
      middle_name: middleName,
      last_name: lastName,
      email: email,
      password: password,
      password_confirmation: confirmPassword,
    };

    const headers = {
      Authorization: `Bearer ${localStorage.getItem('authToken')}`,
    };

    return this.http
      .post<{ message: string; token: string }>(
        `${initAccountEndpoint}`,
        initPayload,
        {
          headers,
        }
      )
      .pipe(
        tap((res: { message: string; token: string }) => {
          localStorage.removeItem('initialize');
          localStorage.removeItem('authToken');
          this.isAuthenticated.next(true);
        }),
        shareReplay({ bufferSize: 1, refCount: true })
      );
  }

  checkAuthentication(): Observable<boolean> {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem('authToken')}`,
    };

    return this.http
      .get<{ message: string }>(`${tokenValidationEndpoint}`, { headers })
      .pipe(
        tap((res: { message: string }) => {
          this.isAuthenticated.next(true);
        }),
        map((res: { message: string }) => true),
        catchError((err: any) => {
          localStorage.removeItem('initialize');
          localStorage.removeItem('authToken');
          this.isAuthenticated.next(false);
          return of(false);
        }),
        map((res: boolean) => res),
        shareReplay({ bufferSize: 1, refCount: true })
      );
  }

  checkInitialization(): boolean {
    return JSON.parse(localStorage.getItem('initialize') ?? 'false') ?? false;
  }

  getProfile() {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem('authToken')}`,
    };

    return this.http
      .get<User>(`${profileEndpoint}`, { headers })
      .pipe(shareReplay({ bufferSize: 1, refCount: true }));
  }

  checkRole(role: string[]): boolean {
    return role.includes(localStorage.getItem('role') ?? '');
  }
}
