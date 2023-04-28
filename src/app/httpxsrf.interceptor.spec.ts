import { TestBed } from '@angular/core/testing';

import { HttpxsrfInterceptor } from './httpxsrf.interceptor';

describe('HttpxsrfInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      HttpxsrfInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: HttpxsrfInterceptor = TestBed.inject(HttpxsrfInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
