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
    console.log('coeficiente', coeficiente);
    console.log('nivelImplementacaoAtual', nivelImplementacaoAtual);
    console.log('nivelImplementacaoAlmejado', nivelImplementacaoAlmejado);
    console.log('tamanho', tamanho);
    console.log('populacao', populacao);
    console.log('aldeias', aldeias);
    console.log('grauDiversidade', grauDiversidade);
    console.log('grauAmeaca', grauAmeaca);
    console.log('complexidadeAcesso', complexidadeAcesso);
    console.log('localSede', localSede);

    const exp1 =
      coeficiente.ln_sit_depois * Math.log(nivelImplementacaoAlmejado + 0.01);
    const exp2 =
      coeficiente.ln_quali_var *
      Math.log(nivelImplementacaoAlmejado - nivelImplementacaoAtual + 0.01);
    const exp3 =
      coeficiente.int_situacao *
      (nivelImplementacaoAlmejado *
        (nivelImplementacaoAlmejado - nivelImplementacaoAtual));
    const exp4 = coeficiente.ln_tamanho_TI * Math.log(tamanho);
    const exp5 = coeficiente.ln_populacao * Math.log(populacao);
    const exp6 = coeficiente.aldeia * aldeias;
    const exp7 = coeficiente.Ameaca_Media * (grauAmeaca === 2 ? 1 : 0);
    const exp8 = coeficiente.Ameaca_Alta * (grauAmeaca === 3 ? 1 : 0);
    const exp9 = coeficiente.Ameaca_Altissima * (grauAmeaca === 4 ? 1 : 0);
    const exp10 = coeficiente.Acesso_Medio * (complexidadeAcesso === 2 ? 1 : 0);
    const exp11 =
      coeficiente.Acesso_Dificil * (complexidadeAcesso === 3 ? 1 : 0);
    const exp12 = coeficiente.grau_divers * grauDiversidade;
    const exp13 = coeficiente.d_loc_sede * localSede;
    const exp14 =
      coeficiente.int_ln_ameaca *
      (Math.log(grauAmeaca) * nivelImplementacaoAlmejado);
    const exp15 = coeficiente.ln_aldeia * Math.log(aldeias);
    console.log(coeficiente.grau_divers * grauDiversidade);
    console.log(
      exp1,
      exp2,
      exp3,
      exp4,
      exp5,
      exp6,
      exp7,
      exp8,
      exp9,
      exp10,
      exp11,
      exp12,
      exp13,
      exp14,
      exp15
    );

    const resultado = Math.exp(
      exp1 +
        exp2 +
        exp3 +
        exp4 +
        exp5 +
        exp6 +
        exp7 +
        exp8 +
        exp9 +
        exp10 +
        exp11 +
        exp12 +
        exp13 +
        exp14 +
        exp15
    );
    console.log(resultado);

    if (isNaN(resultado) || !isFinite(resultado)) return 0;
    return Number(resultado.toString().split('e')[0]);
  }
}
