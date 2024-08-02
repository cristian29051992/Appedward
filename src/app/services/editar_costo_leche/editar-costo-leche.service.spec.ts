import { TestBed } from '@angular/core/testing';

import { EditarCostoLecheService } from './editar-costo-leche.service';

describe('EditarCostoLecheService', () => {
  let service: EditarCostoLecheService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditarCostoLecheService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
