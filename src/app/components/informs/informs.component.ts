import { Component, OnInit } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule } from '@angular/forms';  
import { CostoCompraLecheService } from '../../services/costo-compra-leche/costo-compra-leche.service';
import { ProduccionService } from '../../services/produccion/produccion.service';
import { Produccion } from '../../interfaces/produccion';
import { CostoCompraLeche } from '../../interfaces/costo-compra-leche';

@Component({
  selector: 'app-informs',
  templateUrl: './informs.component.html',
  styleUrls: ['./informs.component.css'],
  providers: [DecimalPipe],
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule
  ]
})
export class InformsComponent implements OnInit {
  costoCompraLeche: CostoCompraLeche[] = [];
  produccion: Produccion[] = [];
  fechaInicio: Date | null = null;
  fechaFin: Date | null = null;
  fechaActual: Date = new Date();
  totalCostoCompraLeche: number = 0;
  totalCantidadLitros: number = 0;
  totalProduccion: number = 0;
  totalKgProducidos: number = 0; // Nuevo campo para el total de kilogramos
  gananciasBrutas: number = 0;
  displayedColumns: string[] = ['fecha', 'nombre_producto', 'cantidad_kg', 'valor_total'];

  constructor(
    private costoCompraLecheService: CostoCompraLecheService,
    private produccionService: ProduccionService,
    private decimalPipe: DecimalPipe
  ) { }

  ngOnInit() {
    // Opcionalmente puedes cargar datos iniciales aquí, si es necesario.
  }

  loadDatos(): void {
    if (this.fechaInicio && this.fechaFin) {
      const fechaInicioStr = this.fechaInicio.toISOString().split('T')[0];
      const fechaFinStr = this.fechaFin.toISOString().split('T')[0];

      console.log('Fechas seleccionadas:', fechaInicioStr, fechaFinStr);

      this.costoCompraLecheService.getCostoCompraLecheByDateRange(fechaInicioStr, fechaFinStr)
        .subscribe({
          next: (data) => {
            this.costoCompraLeche = data;
            console.log('Datos de compra de leche:', data);
            this.calculateTotals(); // Calcula los totales después de actualizar los datos
          },
          error: (err) => {
            console.error('Error al obtener los datos de compra de leche:', err);
          }
        });

      this.produccionService.getProduccionByDateRange(fechaInicioStr, fechaFinStr)
        .subscribe({
          next: (data) => {
            this.produccion = data;
            console.log('Datos de producción:', data);
            this.calculateTotals(); // Calcula los totales después de actualizar los datos
          },
          error: (err) => {
            console.error('Error al obtener los datos de producción:', err);
          }
        });
    } else {
      console.log("Por favor, seleccione ambas fechas.");
    }
  }

  formatCurrency(value: number | string): string {
    if (typeof value === 'string') {
      value = parseFloat(value);
    }
    return this.decimalPipe.transform(value, '1.0-0') ? '$' + this.decimalPipe.transform(value, '1.0-0') : '$0';
  }

  formatNumber(value: number | string): string {
    if (typeof value === 'string') {
      value = parseFloat(value);
    }
    return new Intl.NumberFormat('es-ES', { minimumFractionDigits: 0 }).format(value);
  }
  
  
  calculateTotals(): void {
    this.totalCostoCompraLeche = this.costoCompraLeche.reduce((sum, item) => sum + this.cleanNumber(item.costo_total), 0);
    this.totalCantidadLitros = this.costoCompraLeche.reduce((sum, item) => sum + this.cleanNumber(item.cantidad_litros), 0);
    this.totalProduccion = this.produccion.reduce((sum, item) => sum + this.cleanNumber(item.valor_total), 0);
    this.totalKgProducidos = this.produccion.reduce((sum, item) => sum + this.cleanNumber(item.cantidad_kg), 0); // Sumar los kilogramos producidos
    this.gananciasBrutas = this.totalProduccion - this.totalCostoCompraLeche;
    console.log('Total Costo Compra Leche:', this.totalCostoCompraLeche);
    console.log('Total Cantidad Litros:', this.totalCantidadLitros);
    console.log('Total Producción:', this.totalProduccion);
    console.log('Total Kg Producidos:', this.totalKgProducidos);
    console.log('Ganancias Brutas:', this.gananciasBrutas);
  }

  cleanNumber(value: any): number {
    if (typeof value === 'string') {
      // Remover caracteres no numéricos, excepto el punto decimal
      value = value.replace(/[^\d.-]/g, '');
    }
    return parseFloat(value) || 0;
  }
}
