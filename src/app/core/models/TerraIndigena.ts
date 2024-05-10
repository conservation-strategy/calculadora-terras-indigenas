interface TerraIndigena {
  selecionada?: boolean;
  nome: string;
  tamanho: number;
  aldeias: number;
  populacao: number;
  grauDiversidade: number;
  grauAmeaca: number;
  complexidadeAcesso: number;
  localSede: number;
  nivelImplementacaoAtual: number[];
  custoContexto: boolean;
}

export default TerraIndigena;
