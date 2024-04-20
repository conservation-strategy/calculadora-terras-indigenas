import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import Coeficiente from '../models/Coeficiente';

@Injectable({
  providedIn: 'root',
})
export class CalculatorService {
  constructor(private http: HttpClient) {}

  getTerrasIndigenas(): Observable<any> {
    return this.http.get('./assets/json/terras_indigenas.json');
  }

  getCoeficientesRecorrentes(): Observable<any> {
    return this.http.get('./assets/json/coeficientes_recorrentes.json');
  }

  getCoeficientesNaoRecorrentes(): Observable<any> {
    return this.http.get('./assets/json/coeficientes_nao_recorrentes.json');
  }

  getEixos(): Observable<any> {
    return this.http.get('./assets/json/eixos.json');
  }

  getIPAddress() {
    return this.http.get('http://api.ipify.org/?format=json');
  }

  calcularCoeficientes(
    coeficientes: Coeficiente[],
    situacaoAlmejada: number,
    situacaoAtual: number,
    tamanho: number,
    populacao: number,
    aldeias: number,
    grauDiversidade: number,
    localSede: number,
    grauAmeaca: number,
    complexidadeAcesso: number
  ): number[] {
    const resultados: number[] = [];

    coeficientes.forEach((coeficiente: any) => {
      const resultado =
        Math.exp(
          parseFloat(coeficiente.ln_sit_depois) * Math.log(situacaoAlmejada)
        ) +
        Math.exp(
          parseFloat(coeficiente.ln_quali_var) *
            Math.log(situacaoAlmejada - situacaoAtual)
        ) +
        Math.exp(
          parseFloat(coeficiente.int_situacao) *
            (situacaoAlmejada - situacaoAtual)
        ) +
        Math.exp(parseFloat(coeficiente.ln_tamanho_TI) * Math.log(tamanho)) +
        Math.exp(parseFloat(coeficiente.ln_populacao) * Math.log(populacao)) +
        Math.exp(parseFloat(coeficiente.aldeia) * aldeias) +
        Math.exp(
          parseFloat(coeficiente.Ameaca_Media) * (grauAmeaca === 1 ? 1 : 0)
        ) +
        Math.exp(
          parseFloat(coeficiente.Ameaca_Alta) * (grauAmeaca === 2 ? 1 : 0)
        ) +
        Math.exp(
          parseFloat(coeficiente.Ameaca_Altissima) * (grauAmeaca === 3 ? 1 : 0)
        ) +
        Math.exp(
          parseFloat(coeficiente.Acesso_Medio) *
            (complexidadeAcesso === 1 ? 1 : 0)
        ) +
        Math.exp(
          parseFloat(coeficiente.Acesso_Dificil) *
            (complexidadeAcesso === 2 ? 1 : 0)
        ) +
        Math.exp(parseFloat(coeficiente.grau_divers) * grauDiversidade) +
        Math.exp(parseFloat(coeficiente.d_loc_sede1) * localSede) +
        Math.exp(parseFloat(coeficiente.int_ln_ameaca) * Math.log(grauAmeaca));

      resultados.push(resultado);
    });

    return resultados;
  }
}
