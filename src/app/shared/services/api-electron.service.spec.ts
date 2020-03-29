import { TestBed } from '@angular/core/testing';

import { ApiElectronService } from './api-electron.service';

describe('ApiService', () => {
  let service: ApiElectronService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiElectronService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
