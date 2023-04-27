import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintCurriculumComponent } from './print-curriculum.component';

describe('PrintCurriculumComponent', () => {
  let component: PrintCurriculumComponent;
  let fixture: ComponentFixture<PrintCurriculumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ PrintCurriculumComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrintCurriculumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
