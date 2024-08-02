import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComprasLecheComponent } from './eliminar_compras-leche.component';

describe('ComprasLecheComponent', () => {
  let component: ComprasLecheComponent;
  let fixture: ComponentFixture<ComprasLecheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComprasLecheComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ComprasLecheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
