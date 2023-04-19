import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-curriculum-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './curriculum-card.component.html',
})
export class CurriculumCardComponent implements OnInit {
  @Input() cardMode: 'card' | 'blueprint' = 'card';
  @Output() buttonClick = new EventEmitter();

  constructor() {}

  mode: 'card' | 'blueprint' = 'card';

  ngOnInit(): void {
    this.mode = this.cardMode;
  }

  onClick() {
    this.buttonClick.emit();
  }
}
