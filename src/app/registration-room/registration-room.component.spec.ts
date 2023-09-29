import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationRoomComponent } from './registration-room.component';

describe('RegistrationRoomComponent', () => {
  let component: RegistrationRoomComponent;
  let fixture: ComponentFixture<RegistrationRoomComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegistrationRoomComponent]
    });
    fixture = TestBed.createComponent(RegistrationRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
