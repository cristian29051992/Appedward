import { TestBed } from '@angular/core/testing';

import { VistaCostolecheProduccionService } from './vista-costoleche-produccion.service';

describe('VistaCostolecheProduccionService', () => {
  let service: VistaCostolecheProduccionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VistaCostolecheProduccionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
