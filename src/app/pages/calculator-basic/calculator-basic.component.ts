import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
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
import { ModalDetalhesEixoComponent } from '../../shared/components/modal-detalhes-eixo/modal-detalhes-eixo.component';
import { CalculatorService } from '../../core/services/calculator.service';
import Coeficiente from '../../core/models/Coeficiente';
import Eixo from '../../core/models/Eixo';
import TerraIndigena from '../../core/models/TerraIndigena';

@Component({
  selector: 'app-calculator-basic',
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
  providers: [CalculatorService],
  templateUrl: './calculator-basic.component.html',
  styleUrl: './calculator-basic.component.scss',
})
export class CalculatorBasicComponent implements OnInit {
  private modalService = inject(NgbModal);

  faQuestionCircle = faQuestionCircle;

  terrasIndigenas: TerraIndigena[] = [];
  coeficientes: Coeficiente[] = [];
  eixos: Eixo[] = [];
  niveisImplementacao: NivelImplementacao[] = [
    { text: 'Básico', value: 10 },
    { text: 'Bom', value: 20 },
  ];

  calculatorFormSubmitted = false;
  calculatorForm = new FormGroup({
    terraIndigenaId: new FormControl('', Validators.required),
    situacaoAlmejada: new FormControl('', Validators.required),
  });

  chart: any;
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

  mostrarResultado = false;
  resultado = {
    valorTotal: 0,
    terraIndigena: '',
    situacaoAlmejada: '',
  };

  constructor(private calculatorService: CalculatorService) {}

  ngOnInit() {
    this.obterTerrasIndigenas();
    this.obterCoeficientes();
    this.obterEixos();
  }

  obterReferenciaGrafico(chart: object) {
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
        this.coeficientes = response;
      });
  }

  obterEixos() {
    this.calculatorService.obterEixos().subscribe((response) => {
      this.eixos = response;
    });
  }

  botaoCalcular() {
    this.calculatorFormSubmitted = true;
    this.limparResultado();

    if (this.calculatorForm.invalid) return;

    const { terraIndigenaId, situacaoAlmejada } = this.calculatorForm.value;
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
        situacaoAlmejadaSelecionada
      );
    }
  }

  calcularResultado(
    terraIndigenaSelecionada: TerraIndigena,
    situacaoAlmejada: NivelImplementacao
  ) {
    const {
      situacaoAtual,
      tamanho,
      populacao,
      aldeias,
      grauDiversidade,
      localSede,
      grauAmeaca,
      complexidadeAcesso,
    } = terraIndigenaSelecionada;

    const resultados = this.calculatorService.calcularCoeficientes(
      this.coeficientes,
      situacaoAlmejada.value,
      situacaoAtual,
      tamanho,
      populacao,
      aldeias,
      grauDiversidade,
      localSede,
      grauAmeaca,
      complexidadeAcesso
    );

    const valorTotal = this.obterSomatoria(resultados);

    this.mostrarResultado = true;
    this.resultado = {
      terraIndigena: terraIndigenaSelecionada.nome,
      valorTotal,
      situacaoAlmejada: situacaoAlmejada.text,
    };

    this.atualizarEixos(resultados, valorTotal);
  }

  atualizarEixos(resultados: number[], valorTotal: number) {
    const eixosValues = [
      this.obterSomatoria(resultados.slice(0, 7)),
      this.obterSomatoria(resultados.slice(7, 13)),
      this.obterSomatoria(resultados.slice(13, 16)),
      this.obterSomatoria(resultados.slice(16, 18)),
      this.obterSomatoria(resultados.slice(18, 21)),
      this.obterSomatoria(resultados.slice(21, 25)),
      this.obterSomatoria(resultados.slice(25, 27)),
      this.obterSomatoria(resultados.slice(27)),
    ];

    this.eixos = this.eixos.map((eixo, index) => ({
      ...eixo,
      valor: eixosValues[index],
    }));

    setTimeout(() => {
      this.atualizarGrafico(valorTotal);
    }, 10);
  }

  atualizarGrafico(valorTotal: number) {
    this.chartOptions.data[0].dataPoints = [];
    this.eixos.forEach((eixo: any) => {
      this.chartOptions.data[0].dataPoints.push({
        name: eixo.nome,
        y: parseFloat(((eixo.valor / valorTotal) * 100).toFixed(2)),
      });
    });
    this.chart.render();
  }

  obterSomatoria(arr: number[]): number {
    return arr.reduce((sum, current) => sum + current, 0);
  }

  limparResultado() {
    this.mostrarResultado = false;
    this.resultado = {
      valorTotal: 0,
      terraIndigena: '',
      situacaoAlmejada: '',
    };
  }

  abrirModal(eixo: Eixo) {
    const modalRef = this.modalService.open(ModalDetalhesEixoComponent, {
      size: 'lg',
    });
    modalRef.componentInstance.eixo = eixo;
  }

  gerarPdf() {
    alert('Em Breve!');
  }
}

type NivelImplementacao = {
  text: string;
  value: number;
};
