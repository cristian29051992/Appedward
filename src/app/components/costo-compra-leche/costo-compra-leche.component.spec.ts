import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CostoCompraLecheComponent } from './costo-compra-leche.component';

describe('CostoCompraLecheComponent', () => {
  let component: CostoCompraLecheComponent;
  let fixture: ComponentFixture<CostoCompraLecheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CostoCompraLecheComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CostoCompraLecheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
