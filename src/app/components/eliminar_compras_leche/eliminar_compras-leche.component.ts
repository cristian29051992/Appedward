import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CostoCompraLecheService } from '../../services/costo-compra-leche/costo-compra-leche.service';
import { CostoCompraLeche } from '../../interfaces/costo-compra-leche';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { DecimalPipe } from '@angular/common';
import { RefreshDataService } from '../../services/refresh-data/refresh-data.service';

@Component({
  selector: 'app-compras-leche',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule    
  ],
  templateUrl: './eliminar_compras-leche.component.html',
  styleUrls: ['./eliminar_compras-leche.component.css'],
  providers: [DecimalPipe]
})
export class ComprasLecheComponent implements OnInit { 
displayedColumns: string[] = ['fecha', 'cantidad_litros','costo_total', 'acciones'];

  dataSource = new MatTableDataSource<CostoCompraLeche>();

  constructor(
    private costoCompraLecheService: CostoCompraLecheService,
    private dialog: MatDialog,
    private decimalPipe: DecimalPipe,
    private refreshDataService: RefreshDataService
  ) { }

  ngOnInit(): void {
    this.loadDatos();
  }

  loadDatos(): void {
    this.costoCompraLecheService.getAllCostoCompraLeche().subscribe(data => {
      console.log('Datos recibidos:', data); // Añade esta línea para verificar los datos
      this.dataSource.data = data;
    });
  }
  

  deleteCostoCompraLeche(id: number): void {
    this.costoCompraLecheService.deleteCostoCompraLeche(id).subscribe(() => {
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


