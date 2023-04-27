import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RejectedCurriculumsComponent } from './rejected-curriculums.component';

describe('RejectedCurriculumsComponent', () => {
  let component: RejectedCurriculumsComponent;
  let fixture: ComponentFixture<RejectedCurriculumsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ RejectedCurriculumsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RejectedCurriculumsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
