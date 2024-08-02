import { Component, OnInit, Inject, HostBinding } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBarModule } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon'; // Importa MatIconModule

@Component({
  selector: 'app-snackbar',
  standalone: true,
  imports: [MatSnackBarModule, CommonModule, MatIconModule], // Asegúrate de incluir MatIconModule aquí
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.css']
})
export class SnackbarComponent implements OnInit {
  @HostBinding('class')
  panelClass!: string; // Propiedad para asignar la clase CSS al componente

  snackbarType!: string; // Propiedad para indicar el tipo de snackbar

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: SnackbarData) { }

  ngOnInit(): void {
    // Establecer la clase CSS según el tipo de mensaje
    this.panelClass = this.data.success ? 'esnack_exito' : 'esnack_error';

    // Establecer el tipo de snackbar
    this.snackbarType = this.data.success ? 'exito' : 'error';
  }
}

export interface SnackbarData {
  message: string;
  actionText: string;
  success: boolean; // Propiedad para indicar si es un mensaje de éxito o error
}
