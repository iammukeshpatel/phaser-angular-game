import { TestBed } from '@angular/core/testing';

import { UiBlockService } from './ui-block.service';

describe('UiBlockService', () => {
  let service: UiBlockService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UiBlockService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
