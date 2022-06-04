import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditHouseholdDataComponent } from './edit-household-data.component';

describe('EditHouseholdDataComponent', () => {
  let component: EditHouseholdDataComponent;
  let fixture: ComponentFixture<EditHouseholdDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditHouseholdDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditHouseholdDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
