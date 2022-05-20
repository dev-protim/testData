import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardBasicInfoComponent } from './dashboard-basic-info.component';

describe('DashboardBasicInfoComponent', () => {
  let component: DashboardBasicInfoComponent;
  let fixture: ComponentFixture<DashboardBasicInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardBasicInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardBasicInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
