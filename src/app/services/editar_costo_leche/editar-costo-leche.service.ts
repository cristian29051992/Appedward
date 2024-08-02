import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EditarCostoLecheService {

  private baseUrl = 'http://localhost:3000/costo-actual-leche';

  constructor(private http: HttpClient) { }

  getCostoLeche(): Observable<number> {
    return this.http.get<number>(this.baseUrl);
  }

  updateCostoLeche(costo: number): Observable<any> {
    const url = `${this.baseUrl}/1`;
    return this.http.put(url, { costo });
  }
}
