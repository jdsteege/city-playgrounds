import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PgListComponent } from './pg-list.component';

describe('PgListComponent', () => {
  let component: PgListComponent;
  let fixture: ComponentFixture<PgListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PgListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PgListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
