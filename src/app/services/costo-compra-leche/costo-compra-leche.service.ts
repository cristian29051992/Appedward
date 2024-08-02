import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CostoCompraLeche } from '../../interfaces/costo-compra-leche';

@Injectable({
  providedIn: 'root'
})
export class CostoCompraLecheService {
  private apiUrl = 'http://localhost:3000/costo-compra-leche';

  constructor(private http: HttpClient) {}

  createCostoCompraLeche(costoCompraLeche: CostoCompraLeche): Observable<CostoCompraLeche> {
    return this.http.post<CostoCompraLeche>(this.apiUrl, costoCompraLeche);
  }

  getAllCostoCompraLeche(): Observable<CostoCompraLeche[]> {
    return this.http.get<CostoCompraLeche[]>(this.apiUrl);
  }

  getCostoCompraLecheByDateRange(fechaInicio: string, fechaFin: string): Observable<CostoCompraLeche[]> {
    const params = new HttpParams()
      .set('fechaInicio', fechaInicio)
      .set('fechaFin', fechaFin);
  
    return this.http.get<CostoCompraLeche[]>(`${this.apiUrl}/rango-fechas`, { params });
  }  

  updateCostoCompraLeche(id: number, data: CostoCompraLeche): Observable<CostoCompraLeche> {
    return this.http.put<CostoCompraLeche>(`${this.apiUrl}/${id}`, data);
  }

  deleteCostoCompraLeche(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
