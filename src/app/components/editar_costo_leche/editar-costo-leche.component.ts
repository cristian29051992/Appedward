import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { EditarCostoLecheService } from '../../services/editar_costo_leche/editar-costo-leche.service';
import { RefreshDataService } from '../../services/refresh-data/refresh-data.service';

@Component({
  selector: 'app-editar-costo-leche',
  templateUrl: './editar-costo-leche.component.html',
  styleUrls: ['./editar-costo-leche.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ]
})
export class EditarCostoLecheComponent implements OnInit {
  costoLecheForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private editarCostoLecheService: EditarCostoLecheService,
    private dialogRef: MatDialogRef<EditarCostoLecheComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private refreshDataService: RefreshDataService
  ) {
    this.costoLecheForm = this.fb.group({
      costo: ['', [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit(): void {
    this.editarCostoLecheService.getCostoLeche().subscribe((costo) => {
      this.costoLecheForm.patchValue({ costo });
    });
  }

  onSave(): void {
    if (this.costoLecheForm.valid) {
      const nuevoCosto = this.costoLecheForm.get('costo')?.value;
      this.editarCostoLecheService.updateCostoLeche(nuevoCosto).subscribe({
        next: () => {
          this.refreshDataService.notifyRefreshData(); // Notificar que se han realizado cambios
          this.dialogRef.close(true);
        },
        error: (err) => console.error('Error al actualizar el costo de la leche', err)
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
