interface TerraIndigena {
  grupo: number;
  nome: string;
  tamanho: number;
  aldeias: number;
  populacao: number;
  grauDiversidade: number;
  grauAmeaca: number;
  complexidadeAcesso: number;
  localSede?: number;
  nivelImplementacaoAtual: number[];
  mapa: string;
}

export default TerraIndigena;
