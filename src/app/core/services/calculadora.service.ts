import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import Coeficiente from '../models/Coeficiente';

@Injectable({
  providedIn: 'root',
})
export class CalculadoraService {
  constructor(private http: HttpClient) {}

  obterSiteConfig(): Observable<any> {
    return this.http.get('./assets/json/site_config.json');
  }

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
    return this.http.get('https://api.ipify.org/?format=json');
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
    complexidadeAcesso: number,
    inflacao: number
  ): number[] {
    const resultados: number[] = [];

    coeficientes.forEach((coeficiente: any, index: number) => {
      let resultado = this.__calcularCoeficiente(
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
      if (inflacao > 0) {
        resultado = resultado + resultado * (inflacao / 100);
      }

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
    localSede: number,
    inflacao: number
  ): number {
    const coeficiente: Coeficiente = coeficientes[atividade];
    let resultado = this.__calcularCoeficiente(
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
    if (inflacao > 0) {
      resultado = resultado + resultado * (inflacao / 100);
    }

    return resultado;
  }

  obterSomatoria(arr: number[]): number {
    return arr.reduce((sum, current) => {
      return sum + (isNaN(current) || !isFinite(current) ? 0 : current);
    }, 0);
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
        coeficiente.ln_sit_depois * Math.log(nivelImplementacaoAlmejado)
      ) +
      Math.exp(
        coeficiente.ln_quali_var *
          Math.log(nivelImplementacaoAlmejado - nivelImplementacaoAtual)
      ) +
      Math.exp(
        coeficiente.int_situacao *
          (nivelImplementacaoAlmejado - nivelImplementacaoAtual)
      ) +
      Math.exp(coeficiente.ln_tamanho_TI * Math.log(tamanho)) +
      Math.exp(coeficiente.ln_populacao * Math.log(populacao)) +
      Math.exp(coeficiente.aldeia * aldeias) +
      Math.exp(coeficiente.Ameaca_Media * (grauAmeaca === 1 ? 1 : 0)) +
      Math.exp(coeficiente.Ameaca_Alta * (grauAmeaca === 2 ? 1 : 0)) +
      Math.exp(coeficiente.Ameaca_Altissima * (grauAmeaca === 3 ? 1 : 0)) +
      Math.exp(coeficiente.Acesso_Medio * (complexidadeAcesso === 1 ? 1 : 0)) +
      Math.exp(
        coeficiente.Acesso_Dificil * (complexidadeAcesso === 2 ? 1 : 0)
      ) +
      Math.exp(coeficiente.grau_divers * grauDiversidade) +
      Math.exp(coeficiente.d_loc_sede * localSede) +
      Math.exp(coeficiente.int_ln_ameaca * Math.log(grauAmeaca));

    if (isNaN(resultado) || !isFinite(resultado)) return 0;

    return Number(resultado.toString().split('e')[0]);
  }
}
