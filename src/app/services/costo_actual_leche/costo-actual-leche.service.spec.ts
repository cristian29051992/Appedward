import { TestBed } from '@angular/core/testing';

import { CostoActualLecheService } from './costo-actual-leche.service';

describe('CostoActualLecheService', () => {
  let service: CostoActualLecheService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CostoActualLecheService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
