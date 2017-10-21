import { TestBed, inject } from '@angular/core/testing';

import { AuthgrudService } from './authgrud.service';

describe('AuthgrudService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthgrudService]
    });
  });

  it('should be created', inject([AuthgrudService], (service: AuthgrudService) => {
    expect(service).toBeTruthy();
  }));
});
