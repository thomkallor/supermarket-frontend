import { TestBed, inject } from '@angular/core/testing';

import { TruemarketService } from './truemarket.service';

describe('TruemarketService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TruemarketService]
    });
  });

  it('should be created', inject([TruemarketService], (service: TruemarketService) => {
    expect(service).toBeTruthy();
  }));
});
