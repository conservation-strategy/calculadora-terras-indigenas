interface TerraIndigena {
  id: number;
  selecionada?: boolean;
  nome: string;
  tamanho: number;
  aldeias: number;
  populacao: number;
  grauDiversidade: number;
  grauAmeaca: number;
  complexidadeAcesso: number;
  localSede: number;
  situacaoAtual: number;
  nivelImplementacaoAtual: number[];
  nivelImplementacaoAlmejado: number[];
}

export default TerraIndigena;
