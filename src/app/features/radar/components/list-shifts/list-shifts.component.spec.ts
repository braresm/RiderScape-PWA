import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListShiftsComponent } from './list-shifts.component';

describe('ListShiftsComponent', () => {
  let component: ListShiftsComponent;
  let fixture: ComponentFixture<ListShiftsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListShiftsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListShiftsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
