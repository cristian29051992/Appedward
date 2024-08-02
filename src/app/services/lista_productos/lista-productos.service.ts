import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListaProductosService {
  private baseUrl = 'http://localhost:3000/productos';

  constructor(private http: HttpClient) { }

  getAllProductos(): Observable<any> {
    return this.http.get(this.baseUrl);
  }

  createProducto(producto: any): Observable<any> {
    return this.http.post(this.baseUrl, producto);
  }

  deleteProducto(id: number): Observable<any> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete(url);
  }

  updateProducto(id: number, producto: any): Observable<any> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.put(url, producto);
  }
}
