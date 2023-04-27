import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCurriculumComponent } from './view-curriculum.component';

describe('ViewCurriculumComponent', () => {
  let component: ViewCurriculumComponent;
  let fixture: ComponentFixture<ViewCurriculumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ViewCurriculumComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewCurriculumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
