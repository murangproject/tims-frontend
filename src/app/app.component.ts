import { Component, OnInit } from '@angular/core';
import { ToastService } from './shared/services/toast.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'frontend';

  toast$ = this.toastService.getToast();

  toastModalState: boolean = false;
  toastColor: boolean = false;
  toastMessage: string = '';

  constructor(private toastService: ToastService) {}
}
