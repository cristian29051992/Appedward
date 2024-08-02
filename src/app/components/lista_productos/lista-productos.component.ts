import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { ListaProductosService } from '../../services/lista_productos/lista-productos.service';

@Component({
  selector: 'app-lista-productos',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule, // Asegúrate de importar ReactiveFormsModule
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule
  ],
  templateUrl: './lista-productos.component.html',
  styleUrls: ['./lista-productos.component.css']
})
export class ListaProductosComponent implements OnInit {
  productosForm: FormGroup;
  productos: any[] = [];
  displayedColumns: string[] = ['nombre', 'precio_kg', 'acciones'];
  dataSource = new MatTableDataSource<any>();

  constructor(
    private fb: FormBuilder,
    private listaProductosService: ListaProductosService
  ) {
    this.productosForm = this.fb.group({
      nombre: ['', Validators.required],
      precio_kg: ['', [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit(): void {
    this.getProductos();
  }

  getProductos(): void {
    this.listaProductosService.getAllProductos().subscribe(
      (data) => {
        this.productos = data;
        this.dataSource.data = data;
      },
      (error) => {
        console.error('Error al obtener productos', error);
      }
    );
  }

  onSubmit(): void {
    if (this.productosForm.valid) {
      this.listaProductosService.createProducto(this.productosForm.value).subscribe(
        (response) => {
          this.productos.push(response);
          this.dataSource.data = this.productos;
          this.productosForm.reset();
        },
        (error) => {
          console.error('Error al crear producto', error);
        }
      );
    }
  }

  deleteProducto(id: number): void {
    this.listaProductosService.deleteProducto(id).subscribe(
      () => {
        this.productos = this.productos.filter((producto) => producto.id !== id);
        this.dataSource.data = this.productos;
      },
      (error) => {
        console.error('Error al eliminar producto', error);
      }
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  updateProducto(producto: any, field: string, event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement) {
      producto[field] = inputElement.value;
      this.listaProductosService.updateProducto(producto.id, producto).subscribe(
        () => {
          console.log('Producto actualizado');
        },
        (error) => {
          console.error('Error al actualizar producto', error);
        }
      );
    }
  }
}