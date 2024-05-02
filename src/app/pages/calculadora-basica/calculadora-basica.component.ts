import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  NgbAccordionModule,
  NgbModal,
  NgbTooltipModule,
} from '@ng-bootstrap/ng-bootstrap';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faQuestionCircle } from '@fortawesome/free-regular-svg-icons';

import { HeaderComponent } from '../../core/layout/header/header.component';
import { ModalEixoDetalhesComponent } from '../../shared/components/modal-eixo-detalhes/modal-eixo-detalhes.component';
import { CalculadoraService } from '../../core/services/calculadora.service';
import Coeficiente from '../../core/models/Coeficiente';
import Eixo from '../../core/models/Eixo';
import TerraIndigena from '../../core/models/TerraIndigena';
import NivelImplementacao from '../../core/models/NivelImplementacao';

import html2canvas from 'html2canvas';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { Alignment, PageBreak } from 'pdfmake/interfaces';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-calculadora-basica',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    NgbTooltipModule,
    NgbAccordionModule,
    CanvasJSAngularChartsModule,
    HeaderComponent,
  ],
  providers: [CalculadoraService, CurrencyPipe],
  templateUrl: './calculadora-basica.component.html',
  styleUrl: './calculadora-basica.component.scss',
})
export class CalculadoraBasicaComponent implements OnInit {
  private modalService = inject(NgbModal);

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
    terraIndigenaId: new FormControl('', Validators.required),
    situacaoAlmejada: new FormControl('', Validators.required),
    inflacao: new FormControl('')
  });

  chartRecorrente: any;
  chartRecorrenteBase64String = '';
  chartRecorrenteOptions = {
    animationEnabled: true,
    data: [
      {
        type: 'pie',
        indexLabel: '{name}: {y}%',
        dataPoints: [{ name: 'y', y: 1 }],
      },
    ],
  };
  chartNaoRecorrente: any;
  chartNaoRecorrenteBase64String = '';
  chartNaoRecorrenteOptions = {
    animationEnabled: true,
    data: [
      {
        type: 'pie',
        indexLabel: '{name}: {y}%',
        dataPoints: [{ name: 'y', y: 1 }],
      },
    ],
  };
  mostrarResultado = false;
  resultado = {
    valorTotal: 0,
    valorRecorrente: 0,
    valorNaoRecorrente: 0,
    terraIndigena: '',
    nivelImplementacaoAlmejado: '',
  };

  ipUsuario = '';

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

  obterReferenciaGraficoRecorrente(chart: object) {
    this.chartRecorrente = chart;
  }

  obterReferenciaGraficoNaoRecorrente(chart: object) {
    this.chartNaoRecorrente = chart;
  }

  botaoCalcular() {
    this.calculatorFormSubmitted = true;
    this.limparResultado();

    if (this.calculatorForm.invalid) return;

    const { terraIndigenaId, situacaoAlmejada, inflacao } = this.calculatorForm.value;
    const terraIndigenaSelecionada = this.terrasIndigenas.find(
      (terraIndigena) => terraIndigena.id === Number(terraIndigenaId)
    );

    const situacaoAlmejadaSelecionada = this.niveisImplementacao.find(
      (nivelImplementacao) =>
        nivelImplementacao.value === Number(situacaoAlmejada)
    );

    if (terraIndigenaSelecionada && situacaoAlmejadaSelecionada) {
      this.calcularResultado(
        terraIndigenaSelecionada,
        situacaoAlmejadaSelecionada,
        Number(inflacao)
      );
    }
  }

  calcularResultado(
    terraIndigenaSelecionada: TerraIndigena,
    situacaoAlmejada: NivelImplementacao,
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
      situacaoAlmejada.value,
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
      situacaoAlmejada.value,
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

    const valorRecorrente =
      this.calculatorService.obterSomatoria(resultadoRecorrentes);
    const valorNaoRecorrente = this.calculatorService.obterSomatoria(
      resultadoNaoRecorrentes
    );

    this.mostrarResultado = true;
    this.resultado = {
      valorTotal: valorRecorrente + valorNaoRecorrente,
      valorRecorrente,
      valorNaoRecorrente,
      terraIndigena: terraIndigenaSelecionada.nome,
      nivelImplementacaoAlmejado: situacaoAlmejada.text,
    };

    this.atualizarEixos(resultadoRecorrentes, resultadoNaoRecorrentes);
    setTimeout(() => {
      document.getElementById('resultado')?.scrollIntoView();
    }, 10);
  }

  atualizarEixos(
    resultadoRecorrentes: number[],
    resultadoNaoRecorrentes: number[]
  ) {
    const valoresEixosRecorrentes = [
      this.calculatorService.obterSomatoria(resultadoRecorrentes.slice(0, 7)),
      this.calculatorService.obterSomatoria(resultadoRecorrentes.slice(7, 13)),
      this.calculatorService.obterSomatoria(resultadoRecorrentes.slice(13, 16)),
      this.calculatorService.obterSomatoria(resultadoRecorrentes.slice(16, 18)),
      this.calculatorService.obterSomatoria(resultadoRecorrentes.slice(18, 21)),
      this.calculatorService.obterSomatoria(resultadoRecorrentes.slice(21, 25)),
      this.calculatorService.obterSomatoria(resultadoRecorrentes.slice(25, 27)),
      this.calculatorService.obterSomatoria(resultadoRecorrentes.slice(27)),
    ];

    const valoresEixosNaoRecorrentes = [
      this.calculatorService.obterSomatoria(
        resultadoNaoRecorrentes.slice(0, 7)
      ),
      this.calculatorService.obterSomatoria(
        resultadoNaoRecorrentes.slice(7, 13)
      ),
      this.calculatorService.obterSomatoria(
        resultadoNaoRecorrentes.slice(13, 16)
      ),
      this.calculatorService.obterSomatoria(
        resultadoNaoRecorrentes.slice(16, 18)
      ),
      this.calculatorService.obterSomatoria(
        resultadoNaoRecorrentes.slice(18, 21)
      ),
      this.calculatorService.obterSomatoria(
        resultadoNaoRecorrentes.slice(21, 25)
      ),
      this.calculatorService.obterSomatoria(
        resultadoNaoRecorrentes.slice(25, 27)
      ),
      this.calculatorService.obterSomatoria(resultadoNaoRecorrentes.slice(27)),
    ];

    this.eixos = this.eixos.map((eixo, index) => ({
      ...eixo,
      valorTotal:
        valoresEixosRecorrentes[index] + valoresEixosNaoRecorrentes[index],
      valorRecorrente: valoresEixosRecorrentes[index],
      valorNaoRecorrente: valoresEixosNaoRecorrentes[index],
    }));

    setTimeout(() => {
      this.atualizarGraficoRecorrente();
      this.atualizarGraficoNaoRecorrente();
    }, 10);
  }

  atualizarGraficoRecorrente() {
    const valorTotal = this.resultado.valorRecorrente;
    this.chartRecorrenteOptions.data[0].dataPoints = [];
    this.eixos.forEach((eixo: any) => {
      this.chartRecorrenteOptions.data[0].dataPoints.push({
        name: eixo.nome,
        y: parseFloat(((eixo.valorRecorrente / valorTotal) * 100).toFixed(2)),
      });
    });
    this.chartRecorrente.render();
    html2canvas(document.querySelector('#chartRecorrente') as HTMLElement).then(
      (canvas) => {
        this.chartRecorrenteBase64String = canvas.toDataURL();
      }
    );
  }

  atualizarGraficoNaoRecorrente() {
    const valorTotal = this.resultado.valorNaoRecorrente;
    this.chartNaoRecorrenteOptions.data[0].dataPoints = [];
    this.eixos.forEach((eixo: any) => {
      this.chartNaoRecorrenteOptions.data[0].dataPoints.push({
        name: eixo.nome,
        y: parseFloat(
          ((eixo.valorNaoRecorrente / valorTotal) * 100).toFixed(2)
        ),
      });
    });
    this.chartNaoRecorrente.render();
    html2canvas(
      document.querySelector('#chartNaoRecorrente') as HTMLElement
    ).then((canvas) => {
      this.chartNaoRecorrenteBase64String = canvas.toDataURL();
    });
  }

  limparResultado() {
    this.mostrarResultado = false;
    this.resultado = {
      valorTotal: 0,
      valorRecorrente: 0,
      valorNaoRecorrente: 0,
      terraIndigena: '',
      nivelImplementacaoAlmejado: '',
    };
  }

  abrirModal(eixo: Eixo) {
    const modalRef = this.modalService.open(ModalEixoDetalhesComponent, {
      size: 'lg',
    });
    modalRef.componentInstance.eixo = eixo;
  }

  gerarPdf() {
    const dataHora = new Date().toLocaleString();
    var docDefinition = {
      header: [
        {
          text: 'Calculadora Básica',
          alignment: 'center' as Alignment,
          fontSize: 24,
          bold: true,
        },
      ],
      content: [
        '\n',
        {
          text: [
            'O custo O custo previsto para a Terra Indígena',
            { text: ` ${this.resultado.terraIndigena} `, bold: true },
            'com o nível de implementação',
            {
              text: ` ${this.resultado.nivelImplementacaoAlmejado} `,
              bold: true,
            },
            ', por ano, é de:',
            '\n\n',
            {
              text: `${this.currencyPipe.transform(
                this.resultado.valorTotal,
                'BRL',
                'symbol',
                '1.0-0'
              )}`,
              fontSize: 20,
              bold: true,
            },
            '\n',
            {
              text: `${this.currencyPipe.transform(
                this.resultado.valorRecorrente,
                'BRL',
                'symbol',
                '1.0-0'
              )} recorrente`,
              fontSize: 12,
            },
            '\n',
            {
              text: `${this.currencyPipe.transform(
                this.resultado.valorNaoRecorrente,
                'BRL',
                'symbol',
                '1.0-0'
              )} não recorrente`,
              fontSize: 12,
            },
          ],
        },
        '\n\n',
        {
          text: 'Recorrente',
          fontSize: 14,
          bold: true,
        },
        {
          image: this.chartRecorrenteBase64String,
          width: 500,
        },
        '\n\n',
        {
          text: 'Não Recorrente',
          fontSize: 14,
          bold: true,
        },
        {
          image: this.chartNaoRecorrenteBase64String,
          width: 500,
          pageBreak: 'after' as PageBreak,
        },
        '\n\n',
        this.eixos.map((eixo) => {
          return {
            text: [
              {
                text: `${eixo.nome}: ${this.currencyPipe.transform(
                  eixo.valorTotal,
                  'BRL',
                  'symbol',
                  '1.0-0'
                )}`,
                fontSize: 14,
                bold: true,
              },
              '\n',
              eixo.descricao,
              '\n\n',
            ],
          };
        }),

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
          text: `Relatório gerado em ${dataHora} IP: ${this.ipUsuario}\n https://conservation-strategy.github.io/calculadora-terras-indigenas`,
          alignment: 'center' as Alignment,
          fontSize: 10,
        },
      ],
    };
    pdfMake.createPdf(docDefinition).download('Calculadora Básica');
  }
}
