import { TestBed } from '@angular/core/testing';

import { CostoCompraLecheService } from './costo-compra-leche.service';

describe('CostoCompraLecheService', () => {
  let service: CostoCompraLecheService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CostoCompraLecheService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
