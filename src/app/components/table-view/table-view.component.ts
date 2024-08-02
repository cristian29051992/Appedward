import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { CommonModule } from '@angular/common';
import { DecimalPipe } from '@angular/common';
import { VistaCostoLecheProduccionService } from '../../services/vista_costoleche_produccion/vista-costoleche-produccion.service';
import { Totales } from '../../interfaces/vista_costoleche_produccion';
import { RefreshDataService } from '../../services/refresh-data/refresh-data.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-table-view',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './table-view.component.html',
  styleUrls: ['./table-view.component.css'],
  providers: [DecimalPipe]
})
export class TableViewComponent implements OnInit {
  displayedColumns: string[] = ['fecha', 'totalLitrosLeche', 'totalCompraLeche', 'totalProductosElaborados', 'totalKgQueso', 'totalProduccion', 'ganancias'];
  dataSource: MatTableDataSource<Totales> = new MatTableDataSource<Totales>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  valorTotalControl: FormControl = new FormControl('');

  constructor(
    private vistaCostoLecheProduccionService: VistaCostoLecheProduccionService,
    private decimalPipe: DecimalPipe,
    private refreshDataService: RefreshDataService,
  ) { }

  ngOnInit(): void {
    this.loadData();
    this.refreshDataService.refreshData$.subscribe(() => {
      this.loadData();
    });

    this.valorTotalControl.valueChanges.subscribe(value => {
      const formattedValue = this.formatCurrency(value);
      this.valorTotalControl.setValue(formattedValue, { emitEvent: false });
    });
  }

  loadData(): void {
    this.vistaCostoLecheProduccionService.getTotales().subscribe(data => {
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, error => {
      console.error('Error al obtener los totales:', error);
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  formatCurrency(value: number | string): string {
    if (typeof value === 'string') {
      value = parseFloat(value);
    }
    return this.decimalPipe.transform(value, '1.0-0') ? '$' + this.decimalPipe.transform(value, '1.0-0') : '$0';
  }
}
