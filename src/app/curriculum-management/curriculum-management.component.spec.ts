import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurriculumManagementComponent } from './curriculum-management.component';

describe('CurriculumManagementComponent', () => {
  let component: CurriculumManagementComponent;
  let fixture: ComponentFixture<CurriculumManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ CurriculumManagementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CurriculumManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
