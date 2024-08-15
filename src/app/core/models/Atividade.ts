import Metrica from './Metrica';

export interface Atividade {
  id: number;
  posicao: number;
  nome: string;
  descricao: string;
  metricaBasico: Metrica[];
  metricaBom: Metrica[];
  valor: number;
}

export default Atividade;
