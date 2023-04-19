import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SemesterManagementComponent } from './semester-management.component';

describe('SemesterManagementComponent', () => {
  let component: SemesterManagementComponent;
  let fixture: ComponentFixture<SemesterManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ SemesterManagementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SemesterManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
