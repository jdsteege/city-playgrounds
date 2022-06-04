import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HouseholdLoginComponent } from './household-login.component';

describe('HouseholdLoginComponent', () => {
  let component: HouseholdLoginComponent;
  let fixture: ComponentFixture<HouseholdLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HouseholdLoginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HouseholdLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
