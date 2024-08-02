import { Component, inject, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import {
  NgbAccordionModule,
  NgbModal,
  NgbTooltipModule,
} from '@ng-bootstrap/ng-bootstrap';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faQuestionCircle } from '@fortawesome/free-regular-svg-icons';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';

import { PageTitleComponent } from '../../core/layout/page-title/page-title.component';
import { CalculadoraService } from '../../core/services/calculadora.service';

import TerraIndigena from '../../core/models/TerraIndigena';
import Coeficiente from '../../core/models/Coeficiente';
import Eixo from '../../core/models/Eixo';

import html2canvas from 'html2canvas';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import {
  Alignment,
  ContentImage,
  Margins,
  PageBreak,
  PageOrientation,
  UnorderedListType,
} from 'pdfmake/interfaces';
import { TipoCusto, TipoCustoTexto } from '../../shared/enums';
import { LoadingComponent } from '../../shared/components/loading/loading.component';
import Atividade from '../../core/models/Atividade';
import SelectOption from '../../core/models/SelectOption';
import { RouterLink } from '@angular/router';
import { ModalFormDetalhesComponent } from '../../shared/components/modal-form-detalhes/modal-form-detalhes.component';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-calculadora-agrupada',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    NgbTooltipModule,
    NgbAccordionModule,
    PageTitleComponent,
    CanvasJSAngularChartsModule,
    LoadingComponent,
    RouterLink,
  ],
  providers: [CalculadoraService, CurrencyPipe],
  templateUrl: './calculadora-agrupada.component.html',
  styleUrl: './calculadora-agrupada.component.scss',
})
export class CalculadoraAgrupadaComponent implements OnInit {
  private modalService = inject(NgbModal);
  faQuestionCircle = faQuestionCircle;
  enumTipoCusto: typeof TipoCusto = TipoCusto;
  enumTipoCustoTexto: typeof TipoCustoTexto = TipoCustoTexto;

  terrasIndigenasSelecionadas: TerraIndigena[] = [];
  grupoTerrasIndigenas: {
    nomeGrupo?: string;
    terrasIndigenas?: TerraIndigena[];
  }[] = [];
  coeficientesRecorrentes: Coeficiente[] = [];
  coeficientesNaoRecorrentes: Coeficiente[] = [];
  listaNivelImplementacaoAtual: SelectOption[] = [];
  listaNivelImplementacaoAlmejado: SelectOption[] = [];
  eixos: Eixo[] = [];
  eixosSelecionados: Eixo[] = [];

  calculadoraFormEnviado = false;
  calculadoraForm = new FormGroup({
    tipoCusto: new FormControl<number | null>(1, Validators.required),
    nivelImplementacaoAtual: new FormControl<number | null>(
      null,
      Validators.required
    ),
    nivelImplementacaoAlmejado: new FormControl<number | null>(
      null,
      Validators.required
    ),
    inflacao: new FormControl<number | null>(null),
  });

  resultado: Resultado | null = null;
  mostrarCarregando = false;
  mostrarResultado = false;
  ipUsuario = '';

  chart: any;
  chartBase64String = '';
  dataPointsRecorrentes: any[] = [];
  dataPointsNaoRecorrentes: any[] = [];

  chartOptions = {
    backgroundColor: '#f2f1f1',
    animationEnabled: true,
    axisY: {
      includeZero: true,
      labelFormatter: (e: any) => {
        return this.currencyPipe.transform(e.value, 'BRL', 'symbol', '1.0-0');
      },
    },
    axisY2: {
      includeZero: true,
      labelFormatter: (e: any) => {
        return this.currencyPipe.transform(e.value, 'BRL', 'symbol', '1.0-0');
      },
    },
    toolTip: {
      shared: true,
      contentFormatter: function (e: any) {
        var content = ' ';
        for (var i = 0; i < e.entries.length; i++) {
          content +=
            e.entries[i].dataPoint.label +
            ' ' +
            e.entries[i].dataSeries.legendText +
            ': ' +
            '<strong>' +
            new CurrencyPipe('pt-BR').transform(
              e.entries[i].dataPoint.y,
              'BRL',
              'symbol',
              '1.0-0'
            ) +
            '</strong>';
          content += '<br/>';
        }
        return content;
      },
    },
    data: [] as any,
  };

  constructor(
    private calculatorService: CalculadoraService,
    private currencyPipe: CurrencyPipe
  ) {}

  ngOnInit() {
    this.obterTerrasIndigenas();
    this.obterCoeficientes();
    this.obterEixos();
    this.obterListaNivelImplementacaoAtual();
    this.obterListaNivelImplementacaoAlmejada();

    this.calculatorService.obterIPAddress().subscribe((response: any) => {
      this.ipUsuario = response ? response?.ip : '';
    });
  }

  obterTerrasIndigenas() {
    this.calculatorService.obterTerrasIndigenas().subscribe((response) => {
      const terrasIndigenasExcluidas = [
        'Araweté/Igarapé Ipixuna',
        'Badjônkôre',
        'Ituna-Itatá',
        'Kapôt Nhinore',
      ];
      this.grupoTerrasIndigenas.push(
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
            .filter(
              (x: TerraIndigena) =>
                x.grupo === 2 && !terrasIndigenasExcluidas.includes(x.nome)
            )
            .sort((a: TerraIndigena, b: TerraIndigena) =>
              a.nome.localeCompare(b.nome)
            ),
        }
      );
    });
  }

  obterCoeficientes() {
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

  obterEixos() {
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

  getChartInstance(chart: object) {
    this.chart = chart;
  }

  selecionarTerraIndigena(evt: any, terraIndigena: TerraIndigena) {
    if (evt.target.checked) {
      this.terrasIndigenasSelecionadas.push(terraIndigena);
    } else {
      this.terrasIndigenasSelecionadas =
        this.terrasIndigenasSelecionadas.filter(
          (x) => x.nome != terraIndigena.nome
        );
    }
  }

  selecionarEixo(evt: any, eixo: Eixo) {
    if (evt.target.checked) {
      this.eixosSelecionados.push(eixo);
    } else {
      this.eixosSelecionados = this.eixosSelecionados.filter(
        (x) => x.nome != eixo.nome
      );
    }
  }

  botaoCalcular(): void {
    this.calculadoraFormEnviado = true;
    this.mostrarResultado = false;
    this.resultado = null;

    if (
      this.calculadoraForm.invalid ||
      this.terrasIndigenasSelecionadas.length == 0 ||
      this.eixosSelecionados.length == 0
    )
      return;

    const {
      inflacao,
      tipoCusto,
      nivelImplementacaoAtual,
      nivelImplementacaoAlmejado,
    } = this.calculadoraForm.value;

    const resultadoTerrasIndigenas: ResultadoTerraIndigena[] = [];

    this.terrasIndigenasSelecionadas.forEach((terraIndigena: TerraIndigena) => {
      const resultadoEixos: ResultadoEixo[] = [];
      let valorTotal = 0;
      this.eixosSelecionados.forEach((eixoSelecionado: Eixo) => {
        const resultado = this.calcularResultadoTerraIndigena(
          terraIndigena,
          eixoSelecionado,
          Number(nivelImplementacaoAtual),
          Number(nivelImplementacaoAlmejado),
          Number(tipoCusto),
          Number(inflacao)
        );
        resultadoEixos.push(resultado);
        valorTotal += resultado.valorEixo;
      });
      const listaGrauAmeaca = [
        { label: 'Baixo', value: 1 },
        { label: 'Médio', value: 2 },
        { label: 'Alto', value: 3 },
        { label: 'Altíssimo', value: 4 },
      ];

      const listaComplexidadeAcesso = [
        { label: 'Fácil', value: 1 },
        { label: 'Médio', value: 2 },
        { label: 'Difícil', value: 3 },
      ];

      const listaLocalSede = [
        { label: 'Cidade', value: 0 },
        { label: 'Aldeia', value: 1 },
      ];
      resultadoTerrasIndigenas.push({
        nome: terraIndigena.nome,

        tamanho: Number(terraIndigena.tamanho).toLocaleString('pt-BR'),
        grauDiversidade: terraIndigena.grauDiversidade,
        aldeias: terraIndigena.aldeias,
        populacao: Number(terraIndigena.populacao).toLocaleString('pt-BR'),
        grauAmeaca: listaGrauAmeaca.filter(
          (x) => x.value == terraIndigena.grauAmeaca
        )[0].label,
        complexidadeAcesso: listaComplexidadeAcesso.filter(
          (x) => x.value == terraIndigena.complexidadeAcesso
        )[0].label,
        localSede: listaLocalSede.filter(
          (x) => x.value == terraIndigena.localSede
        )[0].label,
        resultadoEixos,
        valorTotal,
      });
    });

    this.resultado = {
      nivelImplementacao: this.listaNivelImplementacaoAlmejado.find(
        (x) => x.value == nivelImplementacaoAlmejado
      )!.label,
      tipoCusto: Number(tipoCusto),
      terrasIndigenas: resultadoTerrasIndigenas,
      terrasIndigenasSelecionadas: this.terrasIndigenasSelecionadas.map(
        (x: TerraIndigena) => x.nome
      ),
      eixosSelecionados: this.eixosSelecionados.map((x: Eixo) => x.nome),
      detalhesEixosSelecionados: this.detalhesEixosSelecionados(
        Number(tipoCusto)
      ),
    };

    this.mostrarDivResultado();
  }

  calcularResultadoTerraIndigena(
    terraIndigenaSelecionada: TerraIndigena,
    eixo: Eixo,
    nivelImplementacaoAtual: number,
    nivelImplementacaoAlmejado: number,
    tipoCusto: number,
    inflacao: number
  ): ResultadoEixo {
    const {
      tamanho,
      populacao,
      aldeias,
      grauDiversidade,
      localSede,
      grauAmeaca,
      complexidadeAcesso,
    } = terraIndigenaSelecionada;

    let valorEixo = 0;
    const posicaoInicial = eixo.atividades[0].posicao;
    const posicaoFinal =
      eixo.atividades[eixo.atividades.length - 1].posicao + 1;

    const coeficientes =
      Number(tipoCusto) == this.enumTipoCusto.Recorrente
        ? this.coeficientesRecorrentes
        : this.coeficientesNaoRecorrentes;

    const resultado = this.calculatorService.calculadoraAgrupada(
      coeficientes,
      nivelImplementacaoAtual,
      nivelImplementacaoAlmejado,
      tamanho,
      populacao,
      aldeias,
      grauDiversidade,
      grauAmeaca,
      complexidadeAcesso,
      Number(localSede) >= 0 ? Number(localSede) : 0,
      inflacao
    );
    valorEixo = this.calculatorService.obterSomatoria(
      resultado.slice(posicaoInicial, posicaoFinal)
    );

    return {
      eixo: eixo.nome,
      valorEixo,
    };
  }

  detalhesEixosSelecionados(tipoCusto: number) {
    let eixos: Eixo[] = JSON.parse(JSON.stringify(this.eixosSelecionados));
    const tipoCustoTexo =
      tipoCusto == this.enumTipoCusto.Recorrente
        ? this.enumTipoCustoTexto.Recorrente
        : this.enumTipoCustoTexto.NaoRecorrente;
    // eixos.forEach((eixo: Eixo) => {
    //   eixo.atividades.forEach((atividades: Atividade) => {
    //     atividades.custoBasico = atividades.custoBasico.filter((x) =>
    //       x.startsWith(tipoCustoTexo)
    //     );
    //     atividades.custoBom = atividades.custoBom.filter((x) =>
    //       x.startsWith(tipoCustoTexo)
    //     );
    //   });
    // });

    return eixos;
  }

  mostrarDivResultado() {
    document.getElementById('resultado')?.scrollIntoView();
    this.mostrarCarregando = true;

    setTimeout(() => {
      this.mostrarCarregando = false;
      this.mostrarResultado = true;
      this.atualizarGrafico();

      this.resultado?.terrasIndigenas.sort(
        (a: ResultadoTerraIndigena, b: ResultadoTerraIndigena) =>
          a.nome.localeCompare(b.nome)
      );
    }, 1000);
  }

  atualizarGrafico() {
    if (this.resultado) {
      this.chartOptions.data = [];
      this.resultado.eixosSelecionados.forEach((eixo: string) => {
        const dataPoints = [] as any;
        this.resultado!.terrasIndigenas.sort(
          (a: ResultadoTerraIndigena, b: ResultadoTerraIndigena) =>
            b.nome.localeCompare(a.nome)
        ).forEach((terraIndigena: any) => {
          terraIndigena.resultadoEixos.forEach((item: any) => {
            if (item.eixo == eixo) {
              dataPoints.push({
                y: item.valorEixo,
                label: terraIndigena.nome,
              });
            }
          });
        });
        this.chartOptions.data.push({
          type: 'bar',
          legendText: eixo,
          showInLegend: true,
          dataPoints: dataPoints,
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
      const tableRows: any = [
        [
          { text: 'Terra indigena', style: 'tableHeader' },
          ...this.resultado.eixosSelecionados.map((eixo) => {
            return {
              text: eixo,
              style: 'tableHeader',
            };
          }),
        ],
      ];
      this.resultado.terrasIndigenas.forEach(
        (terraIndigena: ResultadoTerraIndigena) => {
          const row = [{ text: terraIndigena.nome, style: 'tableRow' }];
          terraIndigena.resultadoEixos.forEach((eixo: ResultadoEixo) => {
            row.push({
              text: `${this.currencyPipe.transform(
                eixo.valorEixo,
                'BRL',
                'symbol',
                '1.0-0'
              )}`,
              style: 'tableRow',
            });
          });
          tableRows.push(row);
        }
      );
      const docDefinition = {
        pageOrientation: 'landscape' as PageOrientation,
        pageMargins: [50, 80, 50, 40] as Margins,
        info: {
          title: 'Calculadora Versão Agrupada',
          author: 'CSF',
          subject: 'Calculadora Versão Agrupada',
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
                text: 'Versão Comparativa',
                bold: true,
              },
              ' da calculadora.',
            ],
          },
          '\n',
          'Calcula o custo total de implementação de eixos temáticos selecionados em uma ou mais Terras Indígenas. O usuário pode escolher o nível de implementação desejado (básico ou bom) para cada um dos eixos selecionados. Essa versão é indicada para quem atua em mais de uma Terra Indígena e pretende ter informações gerais de custo de implementação das atividades em mais de uma Terra Indígena selecionada.',
          '\n',
          {
            text: [
              'O custo previsto para os eixos temáticos, com o nível de implementação ',
              {
                text: this.resultado.nivelImplementacao,
                bold: true,
              },
              `${
                this.resultado.terrasIndigenasSelecionadas.length > 1
                  ? ' nas terras indígenas '
                  : ' na terra indígena '
              }`,
              {
                text: this.resultado.terrasIndigenasSelecionadas.join(', '),
                bold: true,
              },
              ' é de:',
            ],
          },

          '\n\n',
          {
            pageBreak: 'after' as PageBreak,
            image: this.chartBase64String,
            fit: [600, 450],
            alignment: 'center' as Alignment,
          } as ContentImage,
          '\n\n',
          {
            table: {
              widths: ['*', ...this.eixosSelecionados.map((x) => '*')],
              headerRows: 1,
              body: tableRows,
            },
          },
          '\n\n',
          {
            type: 'none' as UnorderedListType,
            ul: this.resultado.detalhesEixosSelecionados.map((eixo) => {
              return [
                {
                  text: eixo.nome,
                  bold: true,
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
                      //   ul: atividade.custoBasico.map((x) => {
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
          '\n\n',
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
        styles: {
          tableHeader: {
            bold: true,
            fontSize: 10,
          },
          tableRow: {
            fontSize: 10,
          },
        },
      };
      pdfMake.createPdf(docDefinition).download('Versão Comparativa');
    }
  }

  abrirModalFormDetalhes(campo: string, tooltip: string) {
    const modalRef = this.modalService.open(ModalFormDetalhesComponent, {
      size: 'lg',
    });
    modalRef.componentInstance.campo = campo;
    modalRef.componentInstance.tooltip = tooltip;
  }
}

type Resultado = {
  nivelImplementacao: string;
  terrasIndigenas: ResultadoTerraIndigena[];
  terrasIndigenasSelecionadas: string[];
  eixosSelecionados: string[];
  detalhesEixosSelecionados: Eixo[];
  tipoCusto: number;
};

type ResultadoTerraIndigena = {
  nome: string;
  tamanho: string;
  grauDiversidade: number;
  aldeias: number;
  populacao: string;
  grauAmeaca: string;
  complexidadeAcesso: string;
  localSede: string;
  valorTotal: number;
  resultadoEixos: ResultadoEixo[];
};

type ResultadoEixo = {
  eixo: string;
  valorEixo: number;
};
