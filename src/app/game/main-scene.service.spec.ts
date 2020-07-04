import { TestBed } from '@angular/core/testing';

import { MainSceneService } from './main-scene.service';

describe('MainSceneService', () => {
  let service: MainSceneService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MainSceneService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
