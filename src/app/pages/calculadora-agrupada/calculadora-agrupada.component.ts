import { Component, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
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
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faQuestionCircle } from '@fortawesome/free-regular-svg-icons';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';

import { HeaderComponent } from '../../core/layout/header/header.component';
import { CalculadoraService } from '../../core/services/calculadora.service';

import TerraIndigena from '../../core/models/TerraIndigena';
import Coeficiente from '../../core/models/Coeficiente';
import Eixo from '../../core/models/Eixo';
import NivelImplementacao from '../../core/models/NivelImplementacao';

import html2canvas from 'html2canvas';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { Alignment, ContentImage, PageOrientation } from 'pdfmake/interfaces';
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
    HeaderComponent,
    CanvasJSAngularChartsModule,
  ],
  providers: [CalculadoraService, CurrencyPipe],
  templateUrl: './calculadora-agrupada.component.html',
  styleUrl: './calculadora-agrupada.component.scss',
})
export class CalculadoraAgrupadaComponent implements OnInit {
  faQuestionCircle = faQuestionCircle;

  terrasIndigenas: TerraIndigena[] = [];
  coeficientesRecorrentes: Coeficiente[] = [];
  coeficientesNaoRecorrentes: Coeficiente[] = [];
  eixos: Eixo[] = [];
  eixoSelecionado: Eixo | null = null;
  niveisImplementacao: NivelImplementacao[] = [
    { text: 'Básico', value: 10 },
    // { text: 'Bom', value: 20 },
  ];

  calculadoraFormEnviado = false;
  calculadoraForm = new FormGroup({
    nivelImplementacaoAlmejado: new FormControl('', Validators.required),
    eixo: new FormControl('', Validators.required),
    inflacao: new FormControl(''),
  });

  resultado: any = {};
  mostrarResultado = false;
  ipUsuario = '';

  chart: any;
  chartBase64String = '';
  dataPointsRecorrentes: any[] = [];
  dataPointsNaoRecorrentes: any[] = [];

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
        legendText: 'Recorrentes',
        showInLegend: true,

        dataPoints: this.dataPointsRecorrentes,
      },
      {
        type: 'bar',
        legendText: 'Não Recorrentes',
        showInLegend: true,
        dataPoints: this.dataPointsNaoRecorrentes,
      },
    ],
  };

  constructor(
    private calculatorService: CalculadoraService,
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

  obterTerrasIndigenas() {
    this.calculatorService.obterTerrasIndigenas().subscribe((response) => {
      this.terrasIndigenas = response.filter(
        (x: TerraIndigena) => x.custoContexto
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

  getChartInstance(chart: object) {
    this.chart = chart;
  }

  selecionarTerraIndigena(evt: any, terraIndigena: TerraIndigena) {
    terraIndigena.selecionada = evt.target.checked;
  }

  botaoCalcular() {
    this.calculadoraFormEnviado = true;
    this.mostrarResultado = false;
    this.resultado = {};

    if (this.calculadoraForm.invalid) return;

    const nivelImplementacaoAlmejado: any =
      this.calculadoraForm.controls.nivelImplementacaoAlmejado.value;

    const eixoSelecionado: any = this.calculadoraForm.controls.eixo.value;
    this.eixoSelecionado = eixoSelecionado;

    const resultadoTerrasIndigenas: any = [];
    const terrasIndigenasSelecionadas = this.terrasIndigenas.filter(
      (x) => x.selecionada
    );
    const { inflacao } = this.calculadoraForm.value;
    terrasIndigenasSelecionadas.forEach((terraIndigena: TerraIndigena) => {
      if (terraIndigena.selecionada) {
        resultadoTerrasIndigenas.push(
          this.calcularResultadoTerraIndigena(
            terraIndigena,
            nivelImplementacaoAlmejado,
            Number(inflacao)
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
    nivelImplementacaoAlmejado: NivelImplementacao,
    inflacao: number
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
      complexidadeAcesso,
      inflacao
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
      complexidadeAcesso,
      inflacao
    );

    const posicaoInicial = this.eixoSelecionado?.atividades[0].posicao;
    const posicaoFinal =
      this.eixoSelecionado!.atividades[
        this.eixoSelecionado!.atividades.length - 1
      ].posicao + 1;

    const valorRecorrente = this.calculatorService.obterSomatoria(
      resultadoRecorrentes.slice(posicaoInicial, posicaoFinal)
    );
    const valorNaoRecorrente = this.calculatorService.obterSomatoria(
      resultadoNaoRecorrentes.slice(posicaoInicial, posicaoFinal)
    );

    const resultado = {
      nome: terraIndigenaSelecionada.nome,
      valorRecorrente,
      valorNaoRecorrente,
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

  gerarPdf() {
    const dataHora = new Date().toLocaleString();
    const tableRows: any = [
      [
        { text: 'Terra indigena', rowSpan: 2, style: 'tableHeader' },
        { text: this.eixoSelecionado?.nome, colSpan: 2, style: 'tableHeader' },
        '',
      ],
      [
        '',
        { text: 'Recorrente', style: 'tableHeader' },
        { text: 'Não Recorrente', style: 'tableHeader' },
      ],
    ];
    this.resultado.terrasIndigenas.forEach((x: any) => {
      tableRows.push([
        { text: x.nome, style: 'tableRow' },
        {
          text: this.currencyPipe.transform(
            x.valorRecorrente,
            'BRL',
            'symbol',
            '1.0-0'
          ),
          style: 'tableRow',
        },
        {
          text: this.currencyPipe.transform(
            x.valorNaoRecorrente,
            'BRL',
            'symbol',
            '1.0-0'
          ),
          style: 'tableRow',
        },
      ]);
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
            widths: [400, '*', '*'],
            headerRows: 2,
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
