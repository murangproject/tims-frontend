import { Component, OnInit } from '@angular/core';
import { Theme, ThemeService } from './shared/services/theme.service';
import { ToastService } from './shared/services/toast.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'frontend';

  theme: string = this.themeService.getTheme() ?? 'light';

  toast$ = this.toastService.getToast();
  toastModalState: boolean = false;
  toastColor: boolean = false;
  toastMessage: string = '';

  constructor(
    private toastService: ToastService,
    private themeService: ThemeService
  ) {}
}
