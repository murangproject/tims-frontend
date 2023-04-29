import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, shareReplay } from 'rxjs';
import { Activity } from './activity.model';
import { activityEndpoint } from '../shared/utils/api';

@Injectable({
  providedIn: 'root',
})
export class ActivityService {
  activities$ = new BehaviorSubject<Activity[]>([]);
  constructor(private http: HttpClient) {}

  init() {
    const headers = {
      Authorization: 'Bearer ' + localStorage.getItem('authToken'),
    };

    this.http
      .get<{activities: Activity[]}>(`${activityEndpoint}`, {
        headers,
      })
      .subscribe(res => {
        this.activities$.next(res.activities);
      });
  }

  getActivities() {
    return this.activities$
      .asObservable()
      .pipe(shareReplay({ bufferSize: 1, refCount: true }));
  }
}
