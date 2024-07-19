import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  NgbAccordionModule,
  NgbModal,
  NgbTooltipModule,
} from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faQuestionCircle } from '@fortawesome/free-regular-svg-icons';

import { HeaderComponent } from '../../core/layout/header/header.component';
import { ModalEixoDetalhesComponent } from '../../shared/components/modal-eixo-detalhes/modal-eixo-detalhes.component';
import { CalculadoraService } from '../../core/services/calculadora.service';
import { NumbersOnlyDirective } from '../../shared/numbers-only.directive';

import TerraIndigena from '../../core/models/TerraIndigena';
import Coeficiente from '../../core/models/Coeficiente';
import Eixo from '../../core/models/Eixo';
import { TipoCusto, TipoCustoTexto } from '../../shared/enums';

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import {
  Alignment,
  Margins,
  PageBreak,
  UnorderedListType,
} from 'pdfmake/interfaces';

import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import html2canvas from 'html2canvas';
import { LoadingComponent } from '../../shared/components/loading/loading.component';
import Atividade from '../../core/models/Atividade';
import SelectOption from '../../core/models/SelectOption';
import { ModalFormDetalhesComponent } from '../../shared/components/modal-form-detalhes/modal-form-detalhes.component';
import { RouterLink } from '@angular/router';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-calculadora-terra-indigena',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    NgbTooltipModule,
    NgbAccordionModule,
    HeaderComponent,
    NumbersOnlyDirective,
    CanvasJSAngularChartsModule,
    LoadingComponent,
    RouterLink,
  ],
  providers: [CalculadoraService, CurrencyPipe],
  templateUrl: './calculadora-terra-indigena.component.html',
  styleUrl: './calculadora-terra-indigena.component.scss',
})
export class CalculadoraTerraIndigenaComponent implements OnInit {
  private modalService = inject(NgbModal);
  faQuestionCircle = faQuestionCircle;

  enumTipoCusto: typeof TipoCusto = TipoCusto;
  enumTipoCustoTexto: typeof TipoCustoTexto = TipoCustoTexto;

  grupoTerrasIndigenas: GrupoTerraIndigena[] = [];
  coeficientesRecorrentes: Coeficiente[] = [];
  coeficientesNaoRecorrentes: Coeficiente[] = [];
  eixos: Eixo[] = [];
  terraIndigenaSelecionada: TerraIndigena | null = null;

  chart: any;
  chartBase64String = '';
  chartOptions = {
    animationEnabled: true,
    data: [
      {
        type: 'pie',
        indexLabel: '{name}: {y}%',
        dataPoints: [{ name: 'y', y: 1 }],
      },
    ],
  };

  listaGrauAmeaca: SelectOption[] = [
    { label: 'Baixo', value: 1 },
    { label: 'Médio', value: 2 },
    { label: 'Alto', value: 3 },
    { label: 'Altíssimo', value: 4 },
  ];

  listaComplexidadeAcesso: SelectOption[] = [
    { label: 'Fácil', value: 1 },
    { label: 'Médio', value: 2 },
    { label: 'Difícil', value: 3 },
  ];

  listaLocalSede: SelectOption[] = [
    { label: 'Cidade', value: 0 },
    { label: 'Aldeia', value: 1 },
  ];

  listaNivelImplementacaoAtual: SelectOption[] = [];

  listaNivelImplementacaoAlmejado: SelectOption[] = [];

  calculadoraFormEnviado = false;
  calculadoraForm = new FormGroup({
    terraIndigena: new FormControl<TerraIndigena | null>(
      null,
      Validators.required
    ),
    tamanho: new FormControl<number | null>(null, Validators.required),
    populacao: new FormControl<number | null>(null, Validators.required),
    aldeias: new FormControl<number | null>(null, Validators.required),
    grauDiversidade: new FormControl<number | null>(null, Validators.required),
    grauAmeaca: new FormControl<number | null>(null, Validators.required),
    complexidadeAcesso: new FormControl<number | null>(
      null,
      Validators.required
    ),
    localSede: new FormControl<number | null>(null, Validators.required),
    tipoCusto: new FormControl<number | null>(1, Validators.required),
    nivelImplementacaoAtual: new FormControl<number | null>(
      null,
      Validators.required
    ),
    nivelImplementacaoAlmejado: new FormControl<number>(
      10,
      Validators.required
    ),
    inflacao: new FormControl<number | null>(null),
    permitirAlteracao: new FormControl<boolean>(false),
  });

  erroNivelImplementacao = false;
  mostrarResultado = false;
  mostrarCarregando = false;
  resultado: Resultado | null = null;
  ipUsuario = '';
  tipoResultadoBom = false;

  constructor(
    private calculatorService: CalculadoraService,
    private currencyPipe: CurrencyPipe
  ) {}

  ngOnInit(): void {
    this.obterTerrasIndigenas();
    this.obterCoeficientes();
    this.obterEixos();
    this.obterListaNivelImplementacaoAtual();
    this.obterListaNivelImplementacaoAlmejada();

    this.calculatorService.obterIPAddress().subscribe((response: any) => {
      this.ipUsuario = response ? response?.ip : '';
    });
  }

  permitirAlterarTerraIndigena() {
    const permitir = this.calculadoraForm.controls.permitirAlteracao.value;
    this.habilitarDesabilitarEdicao(!!permitir);
  }

  obterTerrasIndigenas(): void {
    this.calculatorService.obterTerrasIndigenas().subscribe((response) => {
      const terraIndigenaSimulada = {
        grupo: 0,
        nome: 'Terra indígena simulada',
        tamanho: 0,
        aldeias: 0,
        populacao: 0,
        grauDiversidade: 0,
        grauAmeaca: 0,
        complexidadeAcesso: 0,
        localSede: 0,
        nivelImplementacaoAtual: [],
        mapa: 'simulada.png',
      };
      this.grupoTerrasIndigenas.push(
        {
          nomeGrupo: 'Simulação',
          terrasIndigenas: [terraIndigenaSimulada],
        },
        {
          nomeGrupo: 'Terras Indígenas com dados coletados',
          terrasIndigenas: response
            .filter((x: TerraIndigena) => x.grupo === 1)
            .sort((a: TerraIndigena, b: TerraIndigena) =>
              a.nome.localeCompare(b.nome)
            ),
        },
        {
          nomeGrupo: 'Terras Indígenas com dados extrapolados',
          terrasIndigenas: response
            .filter((x: TerraIndigena) => x.grupo === 2)
            .sort((a: TerraIndigena, b: TerraIndigena) =>
              a.nome.localeCompare(b.nome)
            ),
        }
      );
    });
  }

  obterCoeficientes(): void {
    this.calculatorService
      .obterCoeficientesRecorrentes()
      .subscribe((response) => {
        this.coeficientesRecorrentes = response;
      });

    this.calculatorService
      .obterCoeficientesNaoRecorrentes()
      .subscribe((response) => {
        this.coeficientesNaoRecorrentes = response;
      });
  }

  obterEixos(): void {
    this.calculatorService.obterEixos().subscribe((response) => {
      this.eixos = response;
    });
  }

  obterListaNivelImplementacaoAtual() {
    this.calculatorService
      .obterListaNivelImplementacaoAtual()
      .subscribe((response) => {
        this.listaNivelImplementacaoAtual = response;
      });
  }

  obterListaNivelImplementacaoAlmejada() {
    this.calculatorService
      .obterListaNivelImplementacaoAlmejada()
      .subscribe((response) => {
        this.listaNivelImplementacaoAlmejado = response;
      });
  }

  selecionarTerraIndigena(): void {
    const terraIndigena: TerraIndigena | null =
      this.calculadoraForm.controls.terraIndigena.value;

    if (terraIndigena) {
      setTimeout(() => {
        const grupoUmSelecionado = terraIndigena.grupo === 1;
        const situacaoAvaliada2022Valor = 1;
        const situacaoAvaliada2022Texto = 'Situação avaliada em 2022';
        const situacaoExisteNaLista = this.listaNivelImplementacaoAtual.some(
          (x) => x.value == situacaoAvaliada2022Valor
        );

        if (grupoUmSelecionado) {
          if (!situacaoExisteNaLista) {
            this.listaNivelImplementacaoAtual.unshift({
              label: situacaoAvaliada2022Texto,
              value: situacaoAvaliada2022Valor,
            });
          }
        } else {
          this.listaNivelImplementacaoAtual =
            this.listaNivelImplementacaoAtual.filter(
              (x) => x.value != situacaoAvaliada2022Valor
            );
        }

        this.calculadoraForm.patchValue({
          tamanho: terraIndigena.tamanho ? terraIndigena.tamanho : null,
          aldeias: terraIndigena.aldeias ? terraIndigena.aldeias : null,
          populacao: terraIndigena.populacao ? terraIndigena.populacao : null,
          grauDiversidade: terraIndigena.grauDiversidade
            ? terraIndigena.grauDiversidade
            : null,
          grauAmeaca: terraIndigena.grauAmeaca
            ? terraIndigena.grauAmeaca
            : null,
          complexidadeAcesso: terraIndigena.complexidadeAcesso
            ? terraIndigena.complexidadeAcesso
            : null,
          localSede:
            terraIndigena.localSede >= 0 ? terraIndigena.localSede : null,
          nivelImplementacaoAtual: grupoUmSelecionado ? 1 : null,
          permitirAlteracao: false,
        });
        this.habilitarDesabilitarEdicao(false);
        this.terraIndigenaSelecionada = terraIndigena;
      }, 200);
    }
  }

  habilitarDesabilitarEdicao(habilitarEdicao: boolean) {
    if (habilitarEdicao) {
      this.calculadoraForm.controls['tamanho'].enable();
      this.calculadoraForm.controls['populacao'].enable();
      this.calculadoraForm.controls['aldeias'].enable();
      this.calculadoraForm.controls['grauDiversidade'].enable();
      this.calculadoraForm.controls['grauAmeaca'].enable();
      this.calculadoraForm.controls['complexidadeAcesso'].enable();
      this.calculadoraForm.controls['localSede'].enable();
    } else {
      this.calculadoraForm.controls['tamanho'].disable();
      this.calculadoraForm.controls['populacao'].disable();
      this.calculadoraForm.controls['aldeias'].disable();
      this.calculadoraForm.controls['grauDiversidade'].disable();
      this.calculadoraForm.controls['grauAmeaca'].disable();
      this.calculadoraForm.controls['complexidadeAcesso'].disable();
      this.calculadoraForm.controls['localSede'].disable();
    }
  }

  botaoCalcular(): void {
    this.calculadoraFormEnviado = true;
    this.calculadoraForm.patchValue({ permitirAlteracao: true });
    this.habilitarDesabilitarEdicao(true);
    this.limparResultado();
    this.validarFormulario();
  }

  validarFormulario(comLoading: boolean = true): void {
    if (this.calculadoraForm.valid && this.terraIndigenaSelecionada) {
      this.calcularResultado(this.terraIndigenaSelecionada, comLoading);
    }
  }

  calcularResultado(
    terraIndigenaSelecionada: TerraIndigena,
    comLoading: boolean
  ): void {
    const {
      nivelImplementacaoAtual,
      nivelImplementacaoAlmejado,
      tamanho,
      populacao,
      aldeias,
      grauDiversidade,
      localSede,
      grauAmeaca,
      complexidadeAcesso,
      tipoCusto,
      inflacao,
    } = this.calculadoraForm.getRawValue();

    const coeficienteRecorrente =
      Number(tipoCusto) == this.enumTipoCusto.Recorrente;
    const coeficientes = coeficienteRecorrente
      ? this.coeficientesRecorrentes
      : this.coeficientesNaoRecorrentes;

    const listaNivelImplementacaoAtual =
      nivelImplementacaoAtual == 1
        ? terraIndigenaSelecionada.nivelImplementacaoAtual
        : Array(29).fill(Number(nivelImplementacaoAtual));

    const resultadoCoeficientes =
      this.calculatorService.calculadoraTerraIndigena(
        coeficientes,
        coeficienteRecorrente,
        listaNivelImplementacaoAtual,
        Number(nivelImplementacaoAlmejado),
        Number(tamanho),
        Number(populacao),
        Number(aldeias),
        Number(grauDiversidade),
        Number(grauAmeaca),
        Number(complexidadeAcesso),
        Number(localSede),
        Number(inflacao)
      );

    this.resultado = {
      terraIndigena: terraIndigenaSelecionada.nome,
      tipoCusto: Number(tipoCusto),
      valorTotal: this.calculatorService.obterSomatoria(resultadoCoeficientes),
      eixos: this.calcularEixos(resultadoCoeficientes),
      textoNivelImplementacaoAlmejado:
        this.listaNivelImplementacaoAlmejado.find(
          (nivel: any) => nivel.value == Number(nivelImplementacaoAlmejado)
        )!.label,
      variaveisUtilizadas: this.obterVariaveisUtilizadas(),
    };
    console.log('divResultado:', this.resultado);
    this.mostrarDivResultado(comLoading);
  }

  limparResultado() {
    this.mostrarResultado = false;
    this.resultado = null;
  }

  mostrarDivResultado(comLoading: boolean) {
    document.getElementById('resultado')?.scrollIntoView();

    if (comLoading) {
      this.mostrarCarregando = true;
      setTimeout(() => {
        this.mostrarCarregando = false;
        this.mostrarResultado = true;
        this.atualizarGrafico();
      }, 300);
    } else {
      this.mostrarResultado = true;
      this.atualizarGrafico();
    }
  }

  trocarTipoResultado() {
    this.calculadoraForm.patchValue({
      nivelImplementacaoAlmejado: this.tipoResultadoBom ? 20 : 10,
    });
    this.resultado = null;
    this.validarFormulario(false);
  }

  calcularEixos(resultadoCoeficientes: number[]) {
    let eixos: Eixo[] = JSON.parse(JSON.stringify(this.eixos));
    eixos.forEach((eixo: Eixo) => {
      let valorTotalEixo = 0;

      eixo.atividades.forEach((atividade: Atividade) => {
        atividade.valor = resultadoCoeficientes[atividade.posicao];
        valorTotalEixo += atividade.valor;
      });
      eixo.valor = valorTotalEixo;
    });

    return eixos;
  }

  obterReferenciaGrafico(chart: object) {
    this.chart = chart;
  }

  atualizarGrafico() {
    if (this.resultado) {
      const valorTotal = this.resultado.valorTotal;
      this.chartOptions.data[0].dataPoints = [];
      this.resultado.eixos.forEach((eixo: any) => {
        this.chartOptions.data[0].dataPoints.push({
          name: eixo.nome,
          y: parseFloat(((eixo.valor / valorTotal) * 100).toFixed(1)),
        });
      });

      setTimeout(() => {
        this.chart.render();
        document.getElementById('resultado')?.scrollIntoView();

        html2canvas(document.querySelector('#chart') as HTMLElement).then(
          (canvas) => {
            this.chartBase64String = canvas.toDataURL();
          }
        );
      }, 100);
    }
  }

  gerarPdf() {
    if (this.resultado) {
      const dataHora = new Date().toLocaleString();
      const variaveis = this.obterVariaveisUtilizadas();
      const docDefinition = {
        pageMargins: [50, 80, 50, 40] as Margins,
        info: {
          title: 'Calculadora Versão por Terra Indígena',
          author: 'CSF',
          subject: 'Calculadora Versão por Terra Indígena',
        },
        header: [
          {
            margin: 5,
            alignment: 'center' as Alignment,
            image:
              'data:image/jpeg;base64,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',
          },
        ],
        content: [
          {
            text: [
              'O cálculo abaixo foi realizado utilizando a ',
              {
                text: 'Versão por Terra Indígena',
                bold: true,
              },
              ' da calculadora.',
            ],
          },

          '\n',
          'Calcula o custo total de implementação de todos os eixos temáticos em uma Terra Indígena selecionada, podendo o usuário alterar os valores das características da Terra Indígena (tamanho, população, aldeia, complexidade de acesso, grau de ameaça, grau de diversidade e localização da sede da associação) e também definir o nível de implementação atual e desejado.',
          '\n',
          'Essa versão é indicada para usuários que buscam informações mais detalhadas sobre a definição dos níveis de implementação dos eixos temáticos. Nessa versão não é possível selecionar apenas um eixo temático, nem mais de uma Terra Indígena.',
          '\n',
          {
            text: [
              'O custo previsto para os eixos temáticos, com o nível de implementação ',
              {
                text: this.resultado.textoNivelImplementacaoAlmejado,
                bold: true,
              },
              ' na ',
              {
                text: this.resultado.terraIndigena,
                bold: true,
              },
              ' é de:',
            ],
          },
          '\n',
          {
            text: [
              {
                text: `${this.currencyPipe.transform(
                  this.resultado.valorTotal,
                  'BRL',
                  'symbol',
                  '1.0-0'
                )}`,
                bold: true,
                fontSize: 20,
              },
              this.resultado?.tipoCusto === this.enumTipoCusto.Recorrente
                ? ' /ano'
                : ' /1x',
            ],
          },
          '\n\n',
          {
            image: this.chartBase64String,
            width: 450,
            alignment: 'center' as Alignment,
          },
          '\n\n',
          {
            table: {
              widths: ['*', 'auto'],
              body: [
                [
                  {
                    text: 'Parâmetros',
                    bold: true,
                  },
                  {
                    text: 'Valores',
                    bold: true,
                  },
                ],
                ...variaveis.map((x) => {
                  return [
                    x.variavel,
                    {
                      text: [
                        x.valor,
                        {
                          text: x.alterada
                            ? ` (Informação alterada pelo usuário. Valor original: ${x.valorOriginal})`
                            : '',
                          background: '#fafad2',
                        },
                      ],
                    },
                  ];
                }),
              ],
            },
            pageBreak: 'after' as PageBreak,
          },
          {
            type: 'none' as UnorderedListType,
            ul: this.resultado.eixos.map((eixo) => {
              return [
                {
                  text: eixo.nome,
                  bold: true,
                  fontSize: 14,
                },
                {
                  text: [
                    {
                      text: `${this.currencyPipe.transform(
                        eixo.valor,
                        'BRL',
                        'symbol',
                        '1.0-0'
                      )}`,
                      bold: true,
                    },
                    this.resultado?.tipoCusto === this.enumTipoCusto.Recorrente
                      ? ' /ano'
                      : ' /1x',
                  ],
                },
                eixo.descricao,
                '\n',
                {
                  type: 'none' as UnorderedListType,
                  ul: eixo.atividades.map((atividade) => {
                    return [
                      {
                        text: atividade.nome,
                        bold: true,
                        fontSize: 14,
                      },
                      atividade.descricao,
                      // {
                      //   type: 'none' as UnorderedListType,
                      //   ul: atividade.custoBasico.map((x) => {
                      //     return [
                      //       {
                      //         text: [{ text: 'Básico: ', bold: true }, x],
                      //       },
                      //     ];
                      //   }),
                      // },
                      // {
                      //   type: 'none' as UnorderedListType,
                      //   ul: atividade.custoBom.map((x) => {
                      //     return [
                      //       {
                      //         text: [{ text: 'Bom: ', bold: true }, x],
                      //       },
                      //     ];
                      //   }),
                      // },
                      '\n',
                    ];
                  }),
                },
              ];
            }),
          },
          '\n\n',
          {
            text: 'A CSF, o ISA e a Rede Xingu+ não se responsabilizam pelas consequências do uso da calculadora.',
          },
          '\n',
          {
            text: '*Caso as características originais da Terra Indígena sejam alteradas no modelo pelo usuário, a CSF, o ISA e Rede Xingu+ não se responsabilizam pelos resultados*.',
          },
        ],
        footer: [
          {
            margin: 5,
            text: [
              `Relatório gerado em ${dataHora} IP: ${this.ipUsuario}`,
              '\n',
              'https://conservation-strategy.github.io/calculadora-terras-indigenas',
            ],
            alignment: 'center' as Alignment,
            fontSize: 8,
            color: 'gray',
          },
        ],
      };

      pdfMake
        .createPdf(docDefinition)
        .download('Calculadora Versão por Terra Indígena');
    }
  }

  obterVariaveisUtilizadas(): Variavel[] {
    const {
      tamanho,
      aldeias,
      populacao,
      grauDiversidade,
      grauAmeaca,
      complexidadeAcesso,
      localSede,
    } = this.calculadoraForm.value;

    return [
      {
        variavel: 'Tamanho',
        valor: Number(tamanho).toLocaleString('pt-BR'),
        valorOriginal: String(
          this.terraIndigenaSelecionada?.tamanho.toLocaleString('pt-BR')
        ),
        alterada: tamanho != this.terraIndigenaSelecionada?.tamanho,
      },
      {
        variavel: 'Número de povos',
        valor: String(grauDiversidade),
        valorOriginal: String(this.terraIndigenaSelecionada?.grauDiversidade),
        alterada:
          grauDiversidade != this.terraIndigenaSelecionada?.grauDiversidade,
      },
      {
        variavel: 'Número de aldeias',
        valor: String(aldeias),
        valorOriginal: String(this.terraIndigenaSelecionada?.aldeias),
        alterada: aldeias != this.terraIndigenaSelecionada?.aldeias,
      },
      {
        variavel: 'População',
        valor: Number(populacao).toLocaleString('pt-BR'),
        valorOriginal: String(
          this.terraIndigenaSelecionada?.populacao.toLocaleString('pt-BR')
        ),
        alterada: populacao != this.terraIndigenaSelecionada?.populacao,
      },
      {
        variavel: 'Grau de ameaça',
        valor: String(
          this.listaGrauAmeaca.find((x) => x.value === Number(grauAmeaca))
            ?.label
        ),
        valorOriginal: String(
          this.listaGrauAmeaca.find(
            (x) => x.value === Number(this.terraIndigenaSelecionada?.grauAmeaca)
          )?.label
        ),
        alterada: grauAmeaca != this.terraIndigenaSelecionada?.grauAmeaca,
      },
      {
        variavel: 'Complexidade de acesso',
        valor: String(
          this.listaComplexidadeAcesso.find(
            (x) => x.value === Number(complexidadeAcesso)
          )?.label
        ),
        valorOriginal: String(
          this.listaComplexidadeAcesso.find(
            (x) =>
              x.value ===
              Number(this.terraIndigenaSelecionada?.complexidadeAcesso)
          )?.label
        ),
        alterada:
          complexidadeAcesso !=
          this.terraIndigenaSelecionada?.complexidadeAcesso,
      },
      {
        variavel: 'Localização da sede da associação',
        valor: String(
          this.listaLocalSede.find((x) => x.value === Number(localSede))?.label
        ),
        valorOriginal: String(
          this.listaLocalSede.find(
            (x) => x.value === Number(this.terraIndigenaSelecionada?.localSede)
          )?.label
        ),
        alterada: localSede != this.terraIndigenaSelecionada?.localSede,
      },
    ];
  }

  abrirModalFormDetalhes(campo: string, tooltip: string) {
    const modalRef = this.modalService.open(ModalFormDetalhesComponent, {
      size: 'lg',
    });
    modalRef.componentInstance.campo = campo;
    modalRef.componentInstance.tooltip = tooltip;
  }

  modalEixoDetalhes(eixo: Eixo) {
    const modalRef = this.modalService.open(ModalEixoDetalhesComponent, {
      size: 'lg',
    });
    const { tipoCusto } = this.calculadoraForm.getRawValue();
    const isRecorrente = tipoCusto == this.enumTipoCusto.Recorrente;

    let atividades = eixo.atividades;
    if (tipoCusto == this.enumTipoCusto.Recorrente) {
      atividades = atividades.filter((atividade: Atividade) => {
        return atividade.posicao + 1 !== 6;
      });
    }

    const eixoModificado = {
      nome: eixo.nome,
      atividades: atividades.map((atividade: Atividade) => {
        return {
          nome: atividade.nome,
          descricao: atividade.descricao,
          valor:
            atividade.valor > 1000
              ? this.currencyPipe.transform(
                  atividade.valor,
                  'BRL',
                  'symbol',
                  '1.0-0'
                )
              : '< R$ 1.000',
          metricaBasico: atividade.metricaBasico.filter(
            (x) => x.recorrente == isRecorrente
          ),
          metricaBom: atividade.metricaBom.filter(
            (x) => x.recorrente == isRecorrente
          ),
        };
      }),
    };
    modalRef.componentInstance.eixo = eixoModificado;
  }
}

type Resultado = {
  terraIndigena: string;
  tipoCusto: number;
  valorTotal: number;
  eixos: Eixo[];
  textoNivelImplementacaoAlmejado: string;
  variaveisUtilizadas: Variavel[];
};

type GrupoTerraIndigena = {
  nomeGrupo: string;
  terrasIndigenas: TerraIndigena[];
};

type Variavel = {
  variavel: string;
  valor: string;
  valorOriginal: string;
  alterada: boolean;
};
