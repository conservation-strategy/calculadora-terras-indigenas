import { CommonModule, CurrencyPipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faQuestionCircle } from '@fortawesome/free-regular-svg-icons';
import {
  NgbAccordionModule,
  NgbModal,
  NgbTooltipModule,
} from '@ng-bootstrap/ng-bootstrap';

import { CalculadoraService } from '../../core/services/calculadora.service';
import { ExcelExportService } from '../../core/services/excel-export.service';
import { ModalEixoDetalhesComponent } from '../../shared/components/modal-eixo-detalhes/modal-eixo-detalhes.component';
import { NumbersOnlyDirective } from '../../shared/numbers-only.directive';

import Coeficiente from '../../core/models/Coeficiente';
import Eixo from '../../core/models/Eixo';
import TerraIndigena from '../../core/models/TerraIndigena';
import { TipoCusto, TipoCustoTexto } from '../../shared/enums';

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import {
  Alignment,
  Margins,
  PageBreak,
  UnorderedListType,
} from 'pdfmake/interfaces';

import { RouterLink } from '@angular/router';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import html2canvas from 'html2canvas';
import { NgxMaskDirective } from 'ngx-mask';
import Atividade from '../../core/models/Atividade';
import Metrica from '../../core/models/Metrica';
import SelectOption from '../../core/models/SelectOption';
import { LoadingComponent } from '../../shared/components/loading/loading.component';
import { ModalFormDetalhesComponent } from '../../shared/components/modal-form-detalhes/modal-form-detalhes.component';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

declare let gtag: Function;

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
    NumbersOnlyDirective,
    CanvasJSAngularChartsModule,
    LoadingComponent,
    RouterLink,
    NgxMaskDirective,
    TranslateModule,
  ],
  providers: [CalculadoraService, ExcelExportService, CurrencyPipe, TranslateService],
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
    backgroundColor: '#f2f1f1',
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
    private excelExportService: ExcelExportService,
    private currencyPipe: CurrencyPipe,
    private translateService: TranslateService
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
        nivelImplementacaoAtual: [],
        mapa: 'simulada.png',
      };
      this.grupoTerrasIndigenas.push(
        {
          id: 1,
          nomeGrupo: 'Simulação',
          terrasIndigenas: [terraIndigenaSimulada],
        },
        {
          id: 2,
          nomeGrupo: 'Terras Indígenas com dados coletados',
          terrasIndigenas: response
            .filter((x: TerraIndigena) => x.grupo === 1)
            .sort((a: TerraIndigena, b: TerraIndigena) =>
              a.nome.localeCompare(b.nome)
            ),
        },
        {
          id: 3,
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
            Number(terraIndigena.localSede) >= 0
              ? terraIndigena.localSede
              : null,
          nivelImplementacaoAtual: grupoUmSelecionado ? 1 : null,
          permitirAlteracao: false,
        });
        this.habilitarDesabilitarEdicao(false);
        this.terraIndigenaSelecionada = terraIndigena;
        this.limparResultado();
      }, 100);
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

    gtag('event', 'form_submit', {
      form_name: 'calculadora-terra-indigena'
    });
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
      textoNivelImplementacaoAlmejado: this.translateService.instant(
        'desired-situation-list.value-' + nivelImplementacaoAlmejado
      ),
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
          name: this.translateService.instant(
            'thematic-axis.axis-' + eixo.id + '.name'
          ),
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
      const calculatorName = this.translateService.instant(
        'pdf-main.calculator-name'
      );
      const docDefinition = {
        pageMargins: [50, 80, 50, 40] as Margins,
        info: {
          title: calculatorName,
          author: 'CSF',
          subject: calculatorName,
        },
        header: {
          columns: [
            {
              margin: 20,
              alignment: 'center' as Alignment,
              image:
                'data:image/png;base64,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',
            },
            {
              margin: 20,
              alignment: 'center' as Alignment,
              image:
                'data:image/jpg;base64,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',
            },
            {
              margin: 20,
              alignment: 'center' as Alignment,
              image:
                'data:image/png;base64,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',
            },
          ],
        },
        content: [
          {
            text: [
              `${this.translateService.instant('pdf-main.intro')} `,
              {
                text: calculatorName,
                bold: true,
              },
            ],
          },
          '\n',
          this.translateService.instant('pdf-main.paragraph-1'),
          '\n',
          {
            text: this.translateService.instant('pdf-main.result.title'),
            bold: true,
          },
          '\n',
          {
            text: [
              this.translateService.instant('pdf-main.result.part-1'),
              {
                text: this.translateService.instant(
                  'type-of-cost-list.value-' + this.resultado.tipoCusto
                ),
                bold: true,
              },
              this.translateService.instant('pdf-main.result.part-2'),
              {
                text: this.resultado.textoNivelImplementacaoAlmejado,
                bold: true,
              },
              this.translateService.instant('pdf-main.result.part-3'),
              {
                text: this.resultado.terraIndigena,
                bold: true,
              },
              this.translateService.instant('pdf-main.result.part-4'),
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
                ? ` ${this.translateService.instant(
                    'pdf-main.result.per-year'
                  )}`
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
                    text: this.translateService.instant(
                      'pdf-main.table.header-1'
                    ),
                    bold: true,
                  },
                  {
                    text: this.translateService.instant(
                      'pdf-main.table.header-2'
                    ),
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
                            ? ` (${this.translateService.instant(
                                'pdf-main.table.changed-information'
                              )} ${x.valorOriginal})`
                            : '',
                          background: '#fafad2',
                          fontSize: 8,
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
            text: this.translateService.instant(
              'pdf-main.cost-results-by-axes'
            ),
            bold: true,
          },
          '\n',
          {
            type: 'none' as UnorderedListType,
            ul: this.resultado.eixos.map((eixo) => {
              const eixoModificado = this.modificarEixo(eixo);
              return [
                {
                  text: eixoModificado.nome,
                  bold: true,
                  fontSize: 14,
                },
                {
                  text: [
                    {
                      text: `${this.currencyPipe.transform(
                        eixoModificado.valor,
                        'BRL',
                        'symbol',
                        '1.0-0'
                      )}`,
                      bold: true,
                    },
                    this.resultado?.tipoCusto === this.enumTipoCusto.Recorrente
                      ? ` ${this.translateService.instant(
                          'pdf-main.result.per-year'
                        )}`
                      : ' /1x',
                  ],
                },
                eixoModificado.descricao,
                '\n',
                {
                  type: 'none' as UnorderedListType,
                  ul: eixoModificado.atividades.map((atividade) => {
                    return [
                      {
                        text: atividade.nome,
                        bold: true,
                        fontSize: 14,
                      },
                      {
                        text: atividade.valor ? atividade.valor : '',
                        bold: true,
                        fontSize: 14,
                      },
                      atividade.descricao,
                      {
                        type: 'none' as UnorderedListType,
                        ul: atividade.metricaBasico.map((x) => {
                          return [
                            {
                              text: [
                                {
                                  text: `${this.translateService.instant(
                                    'activities.basic-metric'
                                  )}: `,
                                  bold: true,
                                },
                                x.descricao,
                              ],
                            },
                            x.exemplo,
                          ];
                        }),
                      },
                      {
                        type: 'none' as UnorderedListType,
                        ul: atividade.metricaBom.map((x) => {
                          return [
                            {
                              text: [
                                {
                                  text: `${this.translateService.instant(
                                    'activities.good-metric'
                                  )}: `,
                                  bold: true,
                                },
                                x.descricao,
                              ],
                            },
                            x.exemplo,
                          ];
                        }),
                      },
                      '\n',
                    ];
                  }),
                },
              ];
            }),
          },
          '\n\n',
          {
            text: this.translateService.instant('pdf-main.final-1'),
          },
          '\n',
          {
            text: this.translateService.instant('pdf-main.final-2'),
          },
          '\n',
          {
            text: this.translateService.instant('pdf-main.final-3'),
          },
        ],
        footer: [
          {
            margin: 5,
            text: [
              `${this.translateService.instant(
                'pdf-main.report-generated-on'
              )} ${dataHora} IP: ${this.ipUsuario}`,
              '\n',
              'https://conservation-strategy.github.io/calculadora-terras-indigenas',
            ],
            alignment: 'center' as Alignment,
            fontSize: 8,
            color: 'gray',
          },
        ],
      };

      pdfMake.createPdf(docDefinition).download(calculatorName);

      gtag('event', 'download_pdf', {
        pdf_name: 'calculadora-terra-indigena',
        calculator_name: calculatorName
      });
    }
  }

  exportarXls() {
    if (this.resultado) {
      this.excelExportService.exportXls(this.resultado, this.tipoResultadoBom, this.resultado.tipoCusto);
      
      gtag('event', 'download_excel', {
        excel_name: 'governanca-recorrente',
        calculator_name: 'calculadora-terra-indigena'
      });
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

    const selectGrauAmeaca = this.translateService.instant(
      'degree-of-threat-list.value-' + this.terraIndigenaSelecionada?.grauAmeaca
    );
    const selectComplexidadeAcesso = this.translateService.instant(
      'complexity-of-access-list.value-' +
        this.terraIndigenaSelecionada?.complexidadeAcesso
    );
    const selectLocalSede = this.translateService.instant(
      'headquarters-list.value-' + this.terraIndigenaSelecionada?.localSede
    );

    const noInfo = this.translateService.instant(
      'indigenous-land-calculator.costs-by-axis.no-info'
    );

    return [
      {
        name: 'land-size',
        variavel: this.translateService.instant(
          'indigenous-land-calculator.section-result.land-size'
        ),
        valor: Number(tamanho).toLocaleString('pt-BR'),
        valorOriginal: String(
          this.terraIndigenaSelecionada &&
            this.terraIndigenaSelecionada.tamanho > 0
            ? this.terraIndigenaSelecionada?.tamanho.toLocaleString('pt-BR')
            : noInfo
        ),
        alterada: tamanho != this.terraIndigenaSelecionada?.tamanho,
      },
      {
        name: 'peoples',
        variavel: this.translateService.instant(
          'indigenous-land-calculator.section-result.peoples'
        ),
        valor: String(grauDiversidade),
        valorOriginal: String(
          this.terraIndigenaSelecionada &&
            this.terraIndigenaSelecionada.grauDiversidade > 0
            ? this.terraIndigenaSelecionada.grauDiversidade.toLocaleString(
                'pt-BR'
              )
            : noInfo
        ),
        alterada:
          grauDiversidade != this.terraIndigenaSelecionada?.grauDiversidade,
      },
      {
        name: 'villages',
        variavel: this.translateService.instant(
          'indigenous-land-calculator.section-result.villages'
        ),
        valor: String(aldeias),
        valorOriginal: String(
          this.terraIndigenaSelecionada &&
            this.terraIndigenaSelecionada.aldeias > 0
            ? this.terraIndigenaSelecionada.aldeias.toLocaleString('pt-BR')
            : noInfo
        ),
        alterada: aldeias != this.terraIndigenaSelecionada?.aldeias,
      },
      {
        name: 'population',
        variavel: this.translateService.instant(
          'indigenous-land-calculator.section-result.population'
        ),
        valor: Number(populacao).toLocaleString('pt-BR'),
        valorOriginal: String(
          this.terraIndigenaSelecionada &&
            this.terraIndigenaSelecionada.populacao > 0
            ? this.terraIndigenaSelecionada.populacao.toLocaleString('pt-BR')
            : noInfo
        ),
        alterada: populacao != this.terraIndigenaSelecionada?.populacao,
      },
      {
        name: 'degree-of-threat',
        variavel: this.translateService.instant(
          'indigenous-land-calculator.section-result.degree-of-threat'
        ),
        valor: selectGrauAmeaca ? selectGrauAmeaca : '',
        valorOriginal: selectGrauAmeaca ? selectGrauAmeaca : noInfo,
        alterada: grauAmeaca != this.terraIndigenaSelecionada?.grauAmeaca,
      },
      {
        name: 'complexity-of-access',
        variavel: this.translateService.instant(
          'indigenous-land-calculator.section-result.complexity-of-access'
        ),
        valor: selectComplexidadeAcesso ? selectComplexidadeAcesso : '',
        valorOriginal: selectComplexidadeAcesso
          ? selectComplexidadeAcesso
          : noInfo,
        alterada:
          complexidadeAcesso !=
          this.terraIndigenaSelecionada?.complexidadeAcesso,
      },
      {
        name: 'headquarters',
        variavel: this.translateService.instant(
          'indigenous-land-calculator.section-result.headquarters'
        ),
        valor: selectLocalSede ? selectLocalSede : '',
        valorOriginal: String(selectLocalSede ? selectLocalSede : noInfo),
        alterada: localSede != this.terraIndigenaSelecionada?.localSede,
      },
    ];
  }

  abrirModalFormDetalhes(type: string) {
    const formField = this.translateService.instant(`form.${type}`);
    const modalRef = this.modalService.open(ModalFormDetalhesComponent, {
      size: 'lg',
    });
    const typesWithTemplate = [
      'type-of-cost',
      'degree-of-threat',
      'complexity-of-access',
      'current-situation',
      'inflation',
    ];
    modalRef.componentInstance.type = type;
    modalRef.componentInstance.title = formField.name;
    modalRef.componentInstance.description = typesWithTemplate.includes(type)
      ? ''
      : formField.description;
  }

  modalEixoDetalhes(eixo: Eixo) {
    const modalRef = this.modalService.open(ModalEixoDetalhesComponent, {
      size: 'lg',
    });

    const eixoModificado = this.modificarEixo(eixo);
    modalRef.componentInstance.eixo = eixoModificado;
  }

  modificarEixo(eixo: Eixo) {
    const { tipoCusto } = this.calculadoraForm.getRawValue();
    const isRecorrente = tipoCusto == this.enumTipoCusto.Recorrente;

    let atividades = eixo.atividades;
    if (tipoCusto == this.enumTipoCusto.Recorrente) {
      atividades = atividades.filter((atividade: Atividade) => {
        return atividade.posicao + 1 !== 6;
      });
    }

    eixo = this.getAxisTranslastion(eixo);
    return {
      nome: eixo.nome,
      descricao: eixo.descricao,
      valor: eixo.valor,
      atividades: atividades.map((atividade: Atividade) => {
        atividade = this.getActivityTranslastion(atividade);
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
              : '',
          metricaBasico: atividade.metricaBasico
            .filter((x) => x.recorrente == isRecorrente)
            .map((metrica) => {
              return this.getMetricTranslation(metrica, atividade.id, 'basic');
            }),
          metricaBom: atividade.metricaBom
            .filter((x) => x.recorrente == isRecorrente)
            .map((metrica) => {
              return this.getMetricTranslation(metrica, atividade.id, 'good');
            }),
        };
      }),
    };
  }

  getAxisTranslastion(eixo: Eixo) {
    const translatedAxis = this.translateService.instant(
      'thematic-axis.axis-' + eixo.id
    );
    if (translatedAxis != 'thematic-axis.axis-' + eixo.id) {
      eixo.nome = translatedAxis.name;
      eixo.descricao = translatedAxis.description;
    }
    return eixo;
  }

  getActivityTranslastion(atividade: Atividade) {
    const activityName = 'activities.activity-' + atividade.id;
    const translateActivity = this.translateService.instant(activityName);
    if (translateActivity != activityName) {
      atividade.nome = translateActivity.name;
      atividade.descricao = translateActivity.description;
    }
    return atividade;
  }

  getMetricTranslation(metrica: Metrica, atividadeId: number, type: string) {
    const metricType = type + '-metric';
    const metricName = `activities.activity-${atividadeId}.${metricType}`;
    const translateMetric = this.translateService.instant(metricName);
    if (translateMetric != metricName) {
      if (!metrica.recorrente) {
        metrica.descricao = translateMetric['not-current-description'];
        metrica.exemplo = translateMetric['not-current-exemple'];
      } else {
        metrica.descricao = translateMetric['current-description'];
        metrica.exemplo = translateMetric['current-exemple'];
      }
    }
    return metrica;
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
  id: number;
  nomeGrupo: string;
  terrasIndigenas: TerraIndigena[];
};

type Variavel = {
  name: string;
  variavel: string;
  valor: string;
  valorOriginal: string;
  alterada: boolean;
};
