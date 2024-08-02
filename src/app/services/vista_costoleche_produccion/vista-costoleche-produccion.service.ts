import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Totales } from '../../interfaces/vista_costoleche_produccion';

@Injectable({
  providedIn: 'root'
})
export class VistaCostoLecheProduccionService {
  private apiUrl = 'http://localhost:3000/vista-compraleche-produccion';

  constructor(private http: HttpClient) { }

  getTotales(): Observable<Totales[]> { 
    return this.http.get<Totales[]>(`${this.apiUrl}/totales`);
  }
}
