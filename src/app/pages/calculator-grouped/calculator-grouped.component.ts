import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../core/layout/header/header.component';
import {
  NgbAccordionModule,
  NgbTooltipModule,
} from '@ng-bootstrap/ng-bootstrap';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { faQuestionCircle } from '@fortawesome/free-regular-svg-icons';
import { CommonModule, CurrencyPipe } from '@angular/common';
import TerraIndigena from '../../core/models/TerraIndigena';
import Coeficiente from '../../core/models/Coeficiente';
import Eixo from '../../core/models/Eixo';
import { NivelImplementacao } from '../../core/models/NivelImplementacao';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientModule } from '@angular/common/http';
import { CalculatorService } from '../../core/services/calculator.service';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { Alignment, ContentImage, PageOrientation } from 'pdfmake/interfaces';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-calculator-grouped',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    NgbTooltipModule,
    NgbAccordionModule,
    HeaderComponent,
    CanvasJSAngularChartsModule,
  ],
  providers: [CalculatorService, CurrencyPipe],
  templateUrl: './calculator-grouped.component.html',
  styleUrl: './calculator-grouped.component.scss',
})
export class CalculatorGroupedComponent implements OnInit {
  faQuestionCircle = faQuestionCircle;

  terrasIndigenas: TerraIndigena[] = [];
  coeficientesRecorrentes: Coeficiente[] = [];
  coeficientesNaoRecorrentes: Coeficiente[] = [];
  eixos: Eixo[] = [];
  niveisImplementacao: NivelImplementacao[] = [
    { text: 'Básico', value: 10 },
    { text: 'Bom', value: 20 },
  ];

  calculatorFormSubmitted = false;
  calculatorForm = new FormGroup({
    nivelImplementacaoAlmejado: new FormControl('', Validators.required),
  });

  resultado: any = {};
  mostrarResultado = false;
  ipUsuario = '';

  chart: any;
  chartBase64String = '';
  dataPoints1: any[] = [];
  dataPoints2: any[] = [];

  chartOptions = {
    animationEnabled: true,
    axisY: {
      labelFormatter: (e: any) => {
        return this.currencyPipe.transform(e.value, 'BRL', 'symbol', '1.0-0');
      },
    },
    axisY2: {
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
    data: [
      {
        type: 'bar',
        showInLegend: true,
        legendText: 'Recorrentes',
        dataPoints: this.dataPoints1,
      },
      {
        type: 'bar',
        axisYType: 'secondary',
        showInLegend: true,
        legendText: 'Não Recorrentes',
        dataPoints: this.dataPoints2,
      },
    ],
  };

  constructor(
    private calculatorService: CalculatorService,
    private currencyPipe: CurrencyPipe
  ) {}

  ngOnInit() {
    this.obterTerrasIndigenas();
    this.obterCoeficientes();
    this.obterEixos();
    this.calculatorService.obterIPAddress().subscribe((response: any) => {
      this.ipUsuario = response ? response?.ip : '';
    });
  }

  getChartInstance(chart: object) {
    this.chart = chart;
  }

  obterTerrasIndigenas() {
    this.calculatorService.obterTerrasIndigenas().subscribe((response) => {
      this.terrasIndigenas = response;
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

  selecionarTerraIndigena(evt: any, terraIndigena: TerraIndigena) {
    terraIndigena.selecionada = evt.target.checked;
  }

  botaoCalcular() {
    this.calculatorFormSubmitted = true;
    this.mostrarResultado = false;
    this.resultado = {};

    if (this.calculatorForm.invalid) return;

    const nivelImplementacaoAlmejado: any =
      this.calculatorForm.controls.nivelImplementacaoAlmejado.value;

    const resultadoTerrasIndigenas: any = [];
    const terrasIndigenasSelecionadas = this.terrasIndigenas.filter(
      (x) => x.selecionada
    );
    terrasIndigenasSelecionadas.forEach((terraIndigena: TerraIndigena) => {
      if (terraIndigena.selecionada) {
        resultadoTerrasIndigenas.push(
          this.calcularResultadoTerraIndigena(
            terraIndigena,
            nivelImplementacaoAlmejado
          )
        );
      }
    });

    this.resultado = {
      nivelImplementacao: nivelImplementacaoAlmejado.text,
      terrasIndigenas: resultadoTerrasIndigenas,
      terrasIndigenasSelecionadas: terrasIndigenasSelecionadas.map(
        (x) => x.nome
      ),
    };

    this.atualizarGrafico();
    this.mostrarResultado = true;
    setTimeout(() => {
      document.getElementById('resultado')?.scrollIntoView();
    }, 10);
  }

  calcularResultadoTerraIndigena(
    terraIndigenaSelecionada: TerraIndigena,
    nivelImplementacaoAlmejado: NivelImplementacao
  ) {
    const {
      tamanho,
      populacao,
      aldeias,
      grauDiversidade,
      localSede,
      grauAmeaca,
      complexidadeAcesso,
      nivelImplementacaoAtual,
    } = terraIndigenaSelecionada;

    const resultadoRecorrentes = this.calculatorService.calculadoraBasica(
      this.coeficientesRecorrentes,
      nivelImplementacaoAlmejado.value,
      nivelImplementacaoAtual,
      tamanho,
      populacao,
      aldeias,
      grauDiversidade,
      localSede,
      grauAmeaca,
      complexidadeAcesso
    );
    const resultadoNaoRecorrentes = this.calculatorService.calculadoraBasica(
      this.coeficientesNaoRecorrentes,
      nivelImplementacaoAlmejado.value,
      terraIndigenaSelecionada.nivelImplementacaoAtual,
      tamanho,
      populacao,
      aldeias,
      grauDiversidade,
      localSede,
      grauAmeaca,
      complexidadeAcesso
    );
    const valorRecorrente = this.obterSomatoria(resultadoRecorrentes);
    const valorNaoRecorrente = this.obterSomatoria(resultadoNaoRecorrentes);

    const valoresEixosRecorrentes = [
      this.obterSomatoria(resultadoRecorrentes.slice(0, 7)),
      this.obterSomatoria(resultadoRecorrentes.slice(7, 13)),
      this.obterSomatoria(resultadoRecorrentes.slice(13, 16)),
      this.obterSomatoria(resultadoRecorrentes.slice(16, 18)),
      this.obterSomatoria(resultadoRecorrentes.slice(18, 21)),
      this.obterSomatoria(resultadoRecorrentes.slice(21, 25)),
      this.obterSomatoria(resultadoRecorrentes.slice(25, 27)),
      this.obterSomatoria(resultadoRecorrentes.slice(27)),
    ];

    const valoresEixosNaoRecorrentes = [
      this.obterSomatoria(resultadoNaoRecorrentes.slice(0, 7)),
      this.obterSomatoria(resultadoNaoRecorrentes.slice(7, 13)),
      this.obterSomatoria(resultadoNaoRecorrentes.slice(13, 16)),
      this.obterSomatoria(resultadoNaoRecorrentes.slice(16, 18)),
      this.obterSomatoria(resultadoNaoRecorrentes.slice(18, 21)),
      this.obterSomatoria(resultadoNaoRecorrentes.slice(21, 25)),
      this.obterSomatoria(resultadoNaoRecorrentes.slice(25, 27)),
      this.obterSomatoria(resultadoNaoRecorrentes.slice(27)),
    ];

    const resultado = {
      nome: terraIndigenaSelecionada.nome,
      valorTotal: valorRecorrente + valorNaoRecorrente,
      valorRecorrente,
      valorNaoRecorrente,
      valoresEixosRecorrentes: valoresEixosRecorrentes,
      valoresEixosNaoRecorrentes: valoresEixosNaoRecorrentes,
    };

    return resultado;
  }

  atualizarGrafico() {
    this.chartOptions.data[0].dataPoints = [];
    this.chartOptions.data[1].dataPoints = [];

    this.resultado.terrasIndigenas.forEach((terraIndigena: any) => {
      this.chartOptions.data[0].dataPoints.push({
        y: terraIndigena.valorRecorrente,
        label: terraIndigena.nome,
      });
      this.chartOptions.data[1].dataPoints.push({
        y: terraIndigena.valorNaoRecorrente,
        label: terraIndigena.nome,
      });
    });

    setTimeout(() => {
      this.chart.render();
      html2canvas(document.querySelector('#chartAgrupado') as HTMLElement).then(
        (canvas) => {
          this.chartBase64String = canvas.toDataURL();
        }
      );
    }, 100);
  }

  obterSomatoria(arr: number[]): number {
    return arr.reduce((sum, current) => {
      return sum + (isNaN(current) || !isFinite(current) ? 0 : current);
    }, 0);
  }

  gerarPdf() {
    const dataHora = new Date().toLocaleString();
    const tableRows: any = [
      [
        { text: 'Terra indigena', style: 'tableHeader' },
        { text: 'Total', style: 'tableHeader' },
        { text: 'Tipo', style: 'tableHeader' },
        { text: 'Governança', style: 'tableHeader' },
        { text: 'Fiscalização e Proteção', style: 'tableHeader' },
        { text: 'Fortalecimento Cultural', style: 'tableHeader' },
        { text: 'Geração de renda', style: 'tableHeader' },
        { text: 'Soberania Alimentar', style: 'tableHeader' },
        { text: 'Infraestruturas complementares', style: 'tableHeader' },
        { text: 'Saúde e saneamento complementar', style: 'tableHeader' },
        { text: 'Educação complementar', style: 'tableHeader' },
      ],
    ];
    this.resultado.terrasIndigenas.forEach((x: any) => {
      tableRows.push(
        [
          { text: x.nome, rowSpan: 2, style: 'tableRow' },
          {
            text: this.currencyPipe.transform(
              x.valorTotal,
              'BRL',
              'symbol',
              '1.0-0'
            ),
            rowSpan: 2,
            style: 'tableRow',
          },
          { text: 'Recorrente', style: 'tableRow' },
          ...x.valoresEixosRecorrentes.map((valorEixo: string) => {
            return {
              text: this.currencyPipe.transform(
                valorEixo,
                'BRL',
                'symbol',
                '1.0-0'
              ),
              style: 'tableRow',
            };
          }),
        ],
        [
          '',
          '',
          { text: 'Recorrente', style: 'tableRow' },
          ...x.valoresEixosNaoRecorrentes.map((valorEixo: string) => {
            return {
              text: this.currencyPipe.transform(
                valorEixo,
                'BRL',
                'symbol',
                '1.0-0'
              ),
              style: 'tableRow',
            };
          }),
        ]
      );
    });
    var docDefinition = {
      pageOrientation: 'landscape' as PageOrientation,
      header: [
        {
          text: 'Calculadora Agrupada',
          alignment: 'center' as Alignment,
          fontSize: 24,
          bold: true,
        },
      ],

      content: [
        '\n',
        {
          text: [
            'O custo previsto para as Terras Indígenas',
            {
              text: ` ${this.resultado.terrasIndigenasSelecionadas} `,
              bold: true,
            },
            'com o nível de implementação',
            {
              text: ` ${this.resultado.nivelImplementacao} `,
              bold: true,
            },
            ', por ano, é de:',
          ],
        },
        '\n\n',
        {
          image: this.chartBase64String,
          fit: [800, 500],
          alignment: 'center' as Alignment,
        } as ContentImage,
        '\n\n',
        {
          table: {
            widths: [
              'auto',
              'auto',
              'auto',
              'auto',
              'auto',
              'auto',
              'auto',
              'auto',
              'auto',
              'auto',
              'auto',
            ],
            headerRows: 1,
            body: tableRows,
          },
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
          text: `Relatório gerado em ${dataHora} IP: ${this.ipUsuario}\n https://conservation-strategy.github.io/calculadora-terras-indigenas`,
          alignment: 'center' as Alignment,
          fontSize: 10,
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
    pdfMake.createPdf(docDefinition).download('Calculadora Agrupada');
  }
}
