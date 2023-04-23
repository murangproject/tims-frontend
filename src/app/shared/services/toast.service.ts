import { Injectable } from '@angular/core';
import { BehaviorSubject, shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  toast$ = new BehaviorSubject<{
    open: boolean;
    success: boolean;
    message: string;
  } | null>(null);

  constructor() {}

  showToast(message: string, success: boolean) {
    this.toast$.next({ open: true, success, message });
    new Promise(resolve => setTimeout(resolve, 1000)).then(() => {
      this.toast$.next(null);
    });
  }

  getToast() {
    return this.toast$
      .asObservable()
      .pipe(shareReplay({ bufferSize: 1, refCount: true }));
  }
}
