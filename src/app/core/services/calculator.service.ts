import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CalculatorService {
  constructor(private http: HttpClient) {}

  getTerrasIndigenas(): Observable<any> {
    return this.http.get('./assets/json/terras_indigenas.json');
  }

  getCoeficientesRecorrentes(): Observable<any> {
    return this.http.get('./assets/json/recorrentes.json');
  }

  getCoeficientesNaoRecorrentes(): Observable<any> {
    return this.http.get('./assets/json/nao_recorrentes.json');
  }

  getEixos(): Observable<any> {
    return this.http.get('./assets/json/eixos.json');
  }
}
