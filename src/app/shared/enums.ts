export enum TipoCusto {
  Recorrente = 1,
  NaoRecorrente,
}

export enum TipoCustoTexto {
  Recorrente = 'Recorrente (anual)',
  NaoRecorrente = 'Não recorrente (eventual)',
}

export enum NivelImplmentacao {
  nula = 0,
  situacaoAvaliada2022 = 1,
  preBasico = 5,
  basico = 10,
  intermediario = 15,
  bom = 20,
}

export enum NivelImplmentacaoTexto {
  nula = 'Nula',
  situacaoAvaliada2022 = 'Situação avaliada em 2022',
  preBasico = 'Pré-Básico',
  basico = 'Básico',
  intermediario = 'Intermediario',
  bom = 'Bom',
}
