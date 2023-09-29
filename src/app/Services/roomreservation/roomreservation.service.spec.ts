import { TestBed } from '@angular/core/testing';

import { RoomreservationService } from './roomreservation.service';

describe('RoomreservationService', () => {
  let service: RoomreservationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoomreservationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
