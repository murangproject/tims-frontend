import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-curriculum-customize-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './curriculum-customize-page.component.html',
})
export class CurriculumCustomizePageComponent implements OnInit {
  constructor(private route: ActivatedRoute) {}

  id: string = '';

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'] ?? '';
      console.log(params);
    });
  }
}
