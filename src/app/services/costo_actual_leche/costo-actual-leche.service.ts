// src/app/services/costo-actual-leche.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CostoActualLeche } from '../../interfaces/costo_actual_leche';

@Injectable({
    providedIn: 'root'
})
export class CostoActualLecheService {
    private apiUrl = 'http://localhost:3000';

    constructor(private http: HttpClient) { }    

    getCostoActualLeche(): Observable<number> {
        return this.http.get<number>(`${this.apiUrl}/costo-actual-leche`);
    }

    update(id: number, costoActualLeche: CostoActualLeche): Observable<CostoActualLeche> {
        return this.http.put<CostoActualLeche>(`${this.apiUrl}/${id}`, costoActualLeche);
    }

}
