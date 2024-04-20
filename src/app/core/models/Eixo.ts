export interface Eixo {
  nome: string;
  descricao: string;
  valor: number;
  atividades: Atividade[];
}

export interface Atividade {
  posicao: number;
  nome: string;
  descricao: string;
}

