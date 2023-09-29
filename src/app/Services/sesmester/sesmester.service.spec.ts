import { TestBed } from '@angular/core/testing';

import { SesmesterService } from './sesmester.service';

describe('SesmesterService', () => {
  let service: SesmesterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SesmesterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
