import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Produccion } from '../../interfaces/produccion';

@Injectable({
    providedIn: 'root'
})
export class ProduccionService {
    private apiUrl = 'http://localhost:3000/produccion';

    constructor(private http: HttpClient) { }

    getAllProduccion(): Observable<Produccion[]> {
        return this.http.get<{ message: string, data: Produccion[] }>(this.apiUrl)
            .pipe(
                map(response => response.data)
            );
    }

    getProduccionByDateRange(fechaInicio: string, fechaFin: string): Observable<Produccion[]> {
        const params = new HttpParams()
            .set('fechaInicio', fechaInicio)
            .set('fechaFin', fechaFin);
    
        return this.http.get<{ message: string, data: Produccion[] }>(`${this.apiUrl}/rango-fechas`, { params })
            .pipe(
                map(response => response.data)
            );
    }
    

    createProduccion(data: Produccion): Observable<Produccion> {
        return this.http.post<Produccion>(this.apiUrl, data);
    }

    deleteProduccion(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
}
