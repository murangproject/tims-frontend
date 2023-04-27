import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Theme } from '../shared/services/theme.service';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  themes: string[] = Object.values(Theme);

  selectedTheme: string = 'light';

  ngOnInit(): void {
    this.selectedTheme = localStorage.getItem('theme') ?? 'light';
  }

  setTheme(theme: string): void {
    localStorage.setItem('theme', theme);
    window.location.reload();
    this.selectedTheme = theme;
  }
}
