import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRoomTypeComponent } from './add-room-type.component';

describe('AddRoomTypeComponent', () => {
  let component: AddRoomTypeComponent;
  let fixture: ComponentFixture<AddRoomTypeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddRoomTypeComponent]
    });
    fixture = TestBed.createComponent(AddRoomTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
