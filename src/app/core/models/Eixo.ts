import Atividade from "./Atividade";

interface Eixo {
  nome: string;
  descricao: string;
  valorTotal?: number;
  valorRecorrente?: number;
  valorNaoRecorrente?: number;
  atividades: Atividade[];
}

export default Eixo;

