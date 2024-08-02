import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarCostoLecheComponent } from './editar-costo-leche.component';

describe('EditarCostoLecheComponent', () => {
  let component: EditarCostoLecheComponent;
  let fixture: ComponentFixture<EditarCostoLecheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarCostoLecheComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditarCostoLecheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
