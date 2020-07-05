import { TestBed } from '@angular/core/testing';

import { FaceSceneService } from './face-scene.service';

describe('FaceSceneService', () => {
  let service: FaceSceneService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FaceSceneService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
