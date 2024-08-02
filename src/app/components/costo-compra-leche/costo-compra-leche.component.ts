import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card'; 
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CostoCompraLecheService } from '../../services/costo-compra-leche/costo-compra-leche.service';
import { CostoCompraLeche } from '../../interfaces/costo-compra-leche'; 
import { SnackbarComponent, SnackbarData } from '../snackbar/snackbar.component';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { CostoActualLecheService } from '../../services/costo_actual_leche/costo-actual-leche.service';
import { DecimalPipe } from '@angular/common';
import { TableViewComponent } from '../table-view/table-view.component';
import { RefreshDataService } from '../../services/refresh-data/refresh-data.service';

@Component({
  selector: 'app-costo-compra-leche',
  standalone: true,
  providers: [DecimalPipe],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule,
    MatSnackBarModule,
    CommonModule,
    MatIconModule,
    TableViewComponent // Importa TableViewComponent
  ],
  templateUrl: './costo-compra-leche.component.html',
  styleUrls: ['./costo-compra-leche.component.css']
})
export class CostoCompraLecheComponent implements OnInit {
  compraLecheForm: FormGroup;  
  costoActualLeche: number;
  costo_total_compra: number;

  @ViewChild(TableViewComponent) tableViewComponent!: TableViewComponent;

  constructor(
    private fb: FormBuilder,
    private costoCompraLecheService: CostoCompraLecheService,
    private snackBar: MatSnackBar,
    private costoActualLecheService: CostoActualLecheService,
    private decimalPipe: DecimalPipe,
    private refreshDataService: RefreshDataService
  ) {
    this.costoActualLeche = 0;
    this.costo_total_compra = 0;

     // Inicializar el campo fecha con la fecha actual
    const currentDate = new Date();

    this.compraLecheForm = this.fb.group({
      fecha: [currentDate, Validators.required],
      cantidad_litros: ['', [Validators.required, Validators.min(0)]],
      costo_total: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.obtenerCostoActualLeche();
    this.onChanges();
    this.refreshDataService.refreshData$.subscribe(() => {
      this.obtenerCostoActualLeche(); // Actualiza el costo actual de la leche
    });
  }

  obtenerCostoActualLeche(): void {
    this.costoActualLecheService.getCostoActualLeche().subscribe({
      next: (costo: number) => {
        this.costoActualLeche = costo;
      },
      error: (error) => {
        console.error('Error al obtener el costo actual de la leche:', error);
      }
    });
  }

  get formattedCostoActualLeche(): string {
    return `$ ${this.decimalPipe.transform(this.costoActualLeche, '1.0-0')}`;
  }

  onChanges(): void {
    this.compraLecheForm.get('cantidad_litros')?.valueChanges.subscribe(val => {
      this.updateCostoTotal();
    });
  }

  updateCostoTotal(): void {
    const cantidadLitros = this.compraLecheForm.get('cantidad_litros')?.value || 0;
    const costoTotal = cantidadLitros * this.costoActualLeche;
    this.costo_total_compra = costoTotal;
    this.compraLecheForm.patchValue({
      costo_total: this.decimalPipe.transform(costoTotal, '1.0-0')
    });
  }

  onSubmit(): void {
    if (this.compraLecheForm.valid) {
      const formData: CostoCompraLeche = {
        ...this.compraLecheForm.getRawValue(),
        costo_total: this.costo_total_compra
      };

      this.costoCompraLecheService.createCostoCompraLeche(formData).subscribe({
        next: (response) => {
          console.log('Formulario enviado:', response);
          this.openSnackBar('Se guardó con éxito.', 'success');
          this.refreshDataService.notifyRefreshData();
          // Actualizar la tabla después de guardar los datos
          if (this.tableViewComponent) {
            this.tableViewComponent.loadData();
          }
        },
        error: (error) => {
          console.error('Error al enviar el formulario:', error);
          this.openSnackBar('Error al guardar.', 'error');
        }
      });
    } else {
      console.log('Formulario no válido');
    }
  }

  openSnackBar(message: string, action: string) {
    const data: SnackbarData = {
      message,
      actionText: '',
      success: action === 'success'
    };

    this.snackBar.openFromComponent(SnackbarComponent, {
      duration: 3000,
      data,
      panelClass: action === 'success' ? 'snackbar-success' : 'snackbar-error'
    });
  }
}