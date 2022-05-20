import { TestBed } from '@angular/core/testing';

import { DasbboardControllerService } from './dasbboard-controller.service';

describe('DasbboardControllerService', () => {
  let service: DasbboardControllerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DasbboardControllerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
