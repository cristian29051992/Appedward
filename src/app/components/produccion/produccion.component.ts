import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule, DecimalPipe } from '@angular/common';
import { ProduccionService } from '../../services/produccion/produccion.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent, SnackbarData } from '../snackbar/snackbar.component';
import { ProductosService } from '../../services/productos/productos.service';
import { Producto } from '../../interfaces/productos';
import { RefreshDataService } from '../../services/refresh-data/refresh-data.service';

@Component({
  selector: 'app-produccion',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatSelectModule
  ],
  templateUrl: './produccion.component.html',
  styleUrls: ['./produccion.component.css'],
  providers: [DecimalPipe]
})
export class ProduccionFormComponent implements OnInit {
  produccionForm: FormGroup = this.fb.group({});
  productos: Producto[] = [];
  valorTotal: string = '';
  valorTotalNumber: number = 0; // Variable para almacenar el valor numérico real

  constructor(
    private fb: FormBuilder,
    private produccionService: ProduccionService,
    private snackBar: MatSnackBar,
    private productosService: ProductosService,
    private refreshDataService: RefreshDataService,
    private decimalPipe: DecimalPipe
  ) { }

  ngOnInit(): void {
    // Inicializar el campo fecha con la fecha actual
    const currentDate = new Date();

    this.produccionForm = this.fb.group({
      fecha: [currentDate, Validators.required],
      id_producto: ['', Validators.required],
      cantidad_kg: ['', [Validators.required, Validators.min(0)]],
      precio_kg: [{ value: '', disabled: true }],
      valor_total: ['', [Validators.required, Validators.min(0)]],
    });

    this.productosService.getProductos().subscribe(data => {
      this.productos = data;
      if (this.productos.length > 0) {
        this.produccionForm.get('id_producto')?.setValue(this.productos[0].id);
      }
    });

    this.produccionForm.get('id_producto')?.valueChanges.subscribe(val => {
      this.updatePrecioKg(val);
      this.updateValorTotal();
    });

    this.produccionForm.get('cantidad_kg')?.valueChanges.subscribe(() => {
      this.updateValorTotal();
    });
  }

  updatePrecioKg(productId: number): void {
    const producto = this.productos.find(p => p.id === productId);
    if (producto) {
      this.produccionForm.patchValue({
        precio_kg: producto.precio_kg
      });
    }
  }

  updateValorTotal(): void {
    const cantidadKg = this.produccionForm.get('cantidad_kg')?.value || 0;
    const precioKg = this.produccionForm.get('precio_kg')?.value || 0;
    const total = cantidadKg * precioKg;
    this.valorTotalNumber = total; // Actualiza el valor numérico real
    this.valorTotal = this.formatCurrency(total);
    this.produccionForm.patchValue({
      valor_total: this.valorTotal
    });
  }

  onSubmit(): void {
    if (this.produccionForm.valid) {
      const formData = this.produccionForm.getRawValue();
      formData.valor_total = this.valorTotalNumber; // Reemplaza el valor formateado con el valor numérico real
      this.produccionService.createProduccion(formData).subscribe({
        next: (response) => {
          console.log('Formulario enviado:', response);
          this.openSnackBar('Se guardó con éxito.', 'success');
          this.refreshDataService.notifyRefreshData();
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

  openSnackBar(message: string, action: string): void {
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

  formatCurrency(value: number): string {
    const formattedValue = this.decimalPipe.transform(value, '1.0-0');
    return formattedValue ? `$ ${formattedValue.replace(/,/g, '.')}` : '$ 0';
  }
}
