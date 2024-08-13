import Atividade from './Atividade';

interface Eixo {
  id: number;
  nome: string;
  descricao: string;
  imagem: string;
  valor?: number;
  atividades: Atividade[];
}

export default Eixo;
