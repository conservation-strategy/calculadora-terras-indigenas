import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import Coeficiente from '../models/Coeficiente';

@Injectable({
  providedIn: 'root',
})
export class CalculatorService {
  constructor(private http: HttpClient) {}

  obterTerrasIndigenas(): Observable<any> {
    return this.http.get('./assets/json/terras_indigenas.json');
  }

  obterCoeficientesRecorrentes(): Observable<any> {
    return this.http.get('./assets/json/coeficientes_recorrentes.json');
  }

  obterCoeficientesNaoRecorrentes(): Observable<any> {
    return this.http.get('./assets/json/coeficientes_nao_recorrentes.json');
  }

  obterEixos(): Observable<any> {
    return this.http.get('./assets/json/eixos.json');
  }

  obterIPAddress() {
    return this.http.get('http://api.ipify.org/?format=json');
  }

  calculadoraBasica(
    coeficientes: Coeficiente[],
    nivelImplementacaoAlmejado: number,
    nivelImplementacaoAtual: number[],
    tamanho: number,
    populacao: number,
    aldeias: number,
    grauDiversidade: number,
    localSede: number,
    grauAmeaca: number,
    complexidadeAcesso: number
  ): number[] {
    const resultados: number[] = [];

    coeficientes.forEach((coeficiente: any, index: number) => {
      const resultado = this.__calcularCoeficiente(
        coeficiente,
        nivelImplementacaoAtual[index],
        nivelImplementacaoAlmejado,
        tamanho,
        populacao,
        aldeias,
        grauDiversidade,
        grauAmeaca,
        complexidadeAcesso,
        localSede
      );

      resultados.push(resultado);
    });
    return resultados;
  }

  calculadoraDetalhada(
    coeficientes: Coeficiente[],
    atividade: number,
    nivelImplementacaoAtual: number,
    nivelImplementacaoAlmejado: number,
    tamanho: number,
    populacao: number,
    aldeias: number,
    grauDiversidade: number,
    grauAmeaca: number,
    complexidadeAcesso: number,
    localSede: number
  ): number {
    const coeficiente: Coeficiente = coeficientes[atividade];
    const resultado = this.__calcularCoeficiente(
      coeficiente,
      nivelImplementacaoAtual,
      nivelImplementacaoAlmejado,
      tamanho,
      populacao,
      aldeias,
      grauDiversidade,
      grauAmeaca,
      complexidadeAcesso,
      localSede
    );

    return resultado;
  }

  private __calcularCoeficiente(
    coeficiente: Coeficiente,
    nivelImplementacaoAtual: number,
    nivelImplementacaoAlmejado: number,
    tamanho: number,
    populacao: number,
    aldeias: number,
    grauDiversidade: number,
    grauAmeaca: number,
    complexidadeAcesso: number,
    localSede: number
  ): number {
    const resultado =
      Math.exp(
        parseFloat(coeficiente.ln_sit_depois) *
          Math.log(nivelImplementacaoAlmejado)
      ) +
      Math.exp(
        parseFloat(coeficiente.ln_quali_var) *
          Math.log(nivelImplementacaoAlmejado - nivelImplementacaoAtual)
      ) +
      Math.exp(
        parseFloat(coeficiente.int_situacao) *
          (nivelImplementacaoAlmejado - nivelImplementacaoAtual)
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

    let resultadoCalculado = 0;
    if (!isNaN(resultado) && isFinite(resultado))
      resultadoCalculado = Number(resultado.toString().split('e')[0]);
    return resultadoCalculado;
  }
}
