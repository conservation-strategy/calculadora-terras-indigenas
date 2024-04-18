interface Eixo {
  nome: string;
  descricao: string;
  valor: number;
  listaConteudo: listaConteudo[];
};

type listaConteudo = {
  textoNegrito: string;
  texto: string
}

export default Eixo;