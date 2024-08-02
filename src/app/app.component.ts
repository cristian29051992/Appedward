import { Component, LOCALE_ID } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { DateAdapter } from '@angular/material/core';
import localeEs from '@angular/common/locales/es';
import { CommonModule, registerLocaleData } from '@angular/common';
import { CostoCompraLecheComponent } from './components/costo-compra-leche/costo-compra-leche.component';
import { TableViewComponent } from "./components/table-view/table-view.component";
import { ProduccionFormComponent } from './components/produccion/produccion.component';
import { SnackbarComponent } from './components/snackbar/snackbar.component';
import { EditarCostoLecheComponent } from './components/editar_costo_leche/editar-costo-leche.component';
import { ListaProductosComponent } from "./components/lista_productos/lista-productos.component";
import { InformsComponent } from './components/informs/informs.component';
import { ListaProductosService } from './services/lista_productos/lista-productos.service';
import { ComprasLecheComponent } from './components/eliminar_compras_leche/eliminar_compras-leche.component';
import { MatTableModule } from '@angular/material/table';
import { EliminarProduccionComponent } from './components/eliminar-produccion/eliminar-produccion.component';

registerLocaleData(localeEs);

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule,
    MatSelectModule,
    MatToolbarModule,
    MatIconModule,
    MatDialogModule,
    CommonModule,
    CostoCompraLecheComponent,
    TableViewComponent,
    ProduccionFormComponent,
    SnackbarComponent,
    EditarCostoLecheComponent,
    ListaProductosComponent,
    InformsComponent, 
    MatTableModule   
  ],
  providers: [
    ListaProductosService,
    { provide: LOCALE_ID, useValue: 'es' }, 
    { provide: MAT_DATE_LOCALE, useValue: 'es-ES' }
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend';

  constructor(private dialog: MatDialog, private dateAdapter: DateAdapter<Date>) {
    this.dateAdapter.setLocale('es-ES');
  }

  openEditarCostoLecheDialog(): void {
    this.dialog.open(EditarCostoLecheComponent, {
      width: '400px',
      data: { /* datos opcionales que quieras pasar al diálogo */ }
    });
  }

  openListaProductosDialog(): void {
    this.dialog.open(ListaProductosComponent, {
      width: '530px',
      data: { /* datos opcionales que quieras pasar al diálogo */ }
    });
  }

  openInforms(): void {
    this.dialog.open(InformsComponent, {
      width: '800px',
      data: { /* datos opcionales que quieras pasar al diálogo */ }
    });
  }

  openComprasLecheDialog(): void {
    this.dialog.open(ComprasLecheComponent, {
      width: '600px',
      data: { /* datos opcionales que quieras pasar al diálogo */ }
    });
  }

  openproducciondialog(): void {
    this.dialog.open(EliminarProduccionComponent, {
      width: '600px',
      data: { /* datos opcionales que quieras pasar al diálogo */ }
    });
  }
}
