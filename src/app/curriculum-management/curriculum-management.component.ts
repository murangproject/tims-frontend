import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurriculumCardComponent } from '../shared/components/curriculum-card.component';

@Component({
  selector: 'app-curriculum-management',
  standalone: true,
  imports: [CommonModule, CurriculumCardComponent],
  templateUrl: './curriculum-management.component.html',
  styleUrls: ['./curriculum-management.component.scss'],
})
export class CurriculumManagementComponent {}
