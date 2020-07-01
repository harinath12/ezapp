import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleStaffComponent } from './schedule-staff.component';

describe('ScheduleStaffComponent', () => {
  let component: ScheduleStaffComponent;
  let fixture: ComponentFixture<ScheduleStaffComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScheduleStaffComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleStaffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
