import { TestBed } from '@angular/core/testing';

import { AlignGridService } from './align-grid.service';

describe('AlignGridService', () => {
  let service: AlignGridService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlignGridService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
