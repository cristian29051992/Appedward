import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarProduccionComponent } from './eliminar-produccion.component';

describe('EliminarProduccionComponent', () => {
  let component: EliminarProduccionComponent;
  let fixture: ComponentFixture<EliminarProduccionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EliminarProduccionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EliminarProduccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
