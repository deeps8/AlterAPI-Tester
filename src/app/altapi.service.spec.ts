import { TestBed } from '@angular/core/testing';

import { AltapiService } from './altapi.service';

describe('AltapiService', () => {
  let service: AltapiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AltapiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
