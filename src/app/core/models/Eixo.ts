import Atividade from './Atividade';

interface Eixo {
  nome: string;
  descricao: string;
  valor?: number;
  atividades: Atividade[];
}

export default Eixo;
