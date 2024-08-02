import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ProduccionService } from '../../services/produccion/produccion.service';
import { Produccion } from '../../interfaces/produccion';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { DecimalPipe } from '@angular/common';
import { RefreshDataService } from '../../services/refresh-data/refresh-data.service';

@Component({
  selector: 'app-eliminar-produccion',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule    
  ],
  templateUrl: './eliminar-produccion.component.html',
  styleUrls: ['./eliminar-produccion.component.css'],
  providers: [DecimalPipe]
})
export class EliminarProduccionComponent implements OnInit {
  displayedColumns: string[] = ['fecha', 'producto_nombre', 'cantidad_kg', 'valor_total', 'acciones'];
  dataSource = new MatTableDataSource<Produccion>();

  constructor(
    private produccionService: ProduccionService,
    private dialog: MatDialog,
    private decimalPipe: DecimalPipe,
    private refreshDataService: RefreshDataService
  ) { }

  ngOnInit(): void {
    this.loadDatos();
  }

  loadDatos(): void {
    this.produccionService.getAllProduccion().subscribe(data => {
      console.log('Datos recibidos:', data); // Añade esta línea para verificar los datos
      this.dataSource.data = data;
    });
  }

  deleteProduccion(id: number): void {
    this.produccionService.deleteProduccion(id).subscribe(() => {
      this.loadDatos(); // Recargar los datos después de eliminar un registro
      this.refreshDataService.notifyRefreshData();
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  formatCurrency(value: number | string): string {
    if (typeof value === 'string') {
      value = parseFloat(value);
    }
    return this.decimalPipe.transform(value, '1.0-0') ? '$' + this.decimalPipe.transform(value, '1.0-0') : '$0';
  }
}
