import { TestBed } from '@angular/core/testing';

import { GetProjectUseCaseService } from './get-project-use-case.service';

describe('GetProjectUseCaseService', () => {
  let service: GetProjectUseCaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetProjectUseCaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
