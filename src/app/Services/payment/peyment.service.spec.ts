import { TestBed } from '@angular/core/testing';

import { PeymentService } from './peyment.service';

describe('PeymentService', () => {
  let service: PeymentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PeymentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
