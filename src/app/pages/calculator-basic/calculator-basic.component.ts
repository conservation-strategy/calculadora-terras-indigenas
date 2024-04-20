import { Component, OnInit, inject } from '@angular/core';
import { HeaderComponent } from '../../core/layout/header/header.component';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
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
import { CalculatorService } from '../../core/services/calculator.service';
import TerraIndigena from '../../core/models/TerraIndigena';
import { HttpClientModule } from '@angular/common/http';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import Coeficiente from '../../core/models/Coeficiente';
import { ModalDetalhesEixoComponent } from '../../shared/modal-detalhes-eixo/modal-detalhes-eixo.component';
import { Eixo } from '../../core/models/Eixo';

@Component({
  selector: 'app-calculator-basic',
  standalone: true,
  imports: [
    HeaderComponent,
    CommonModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    NgbTooltipModule,
    NgbAccordionModule,
    HttpClientModule,
    CanvasJSAngularChartsModule,
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
  niveisImplementacao: NivelImplementacao[] = [];

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

  resultado = {
    mostrar: false,
    valorTotal: 0,
    terraIndigena: '',
    situacaoAlmejada: '',
  };

  constructor(private calculatorService: CalculatorService) {}

  ngOnInit() {
    this.niveisImplementacao = [
      { text: 'Básico', value: 10 },
      { text: 'Bom', value: 20 },
    ];

    this.getTerrasIndigenas();
    this.getCoeficientes();
    this.getEixos();
  }

  getChartInstance(chart: object) {
    this.chart = chart;
  }

  getTerrasIndigenas() {
    this.calculatorService.getTerrasIndigenas().subscribe((response) => {
      this.terrasIndigenas = response;
    });
  }

  getCoeficientes() {
    this.calculatorService
      .getCoeficientesRecorrentes()
      .subscribe((response) => {
        this.coeficientes = response;
      });
  }

  getEixos() {
    this.calculatorService.getEixos().subscribe((response) => {
      this.eixos = response;
    });
  }

  handleFormButton() {
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
      this.buildCalculations(
        terraIndigenaSelecionada,
        situacaoAlmejadaSelecionada
      );
    }
  }

  buildCalculations(
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

    const valorTotal = this.getSomatoria(resultados);

    this.resultado = {
      mostrar: true,
      terraIndigena: terraIndigenaSelecionada.nome,
      valorTotal,
      situacaoAlmejada: situacaoAlmejada.text,
    };

    this.updateEixos(resultados, valorTotal);
  }

  updateEixos(resultados: number[], valorTotal: number) {
    const eixosValues = [
      this.getSomatoria(resultados.slice(0, 7)),
      this.getSomatoria(resultados.slice(7, 13)),
      this.getSomatoria(resultados.slice(13, 16)),
      this.getSomatoria(resultados.slice(16, 18)),
      this.getSomatoria(resultados.slice(18, 21)),
      this.getSomatoria(resultados.slice(21, 25)),
      this.getSomatoria(resultados.slice(25, 27)),
      this.getSomatoria(resultados.slice(27)),
    ];

    this.eixos = this.eixos.map((eixo, index) => ({
      ...eixo,
      valor: eixosValues[index],
    }));

    setTimeout(() => {
      this.updateChart(valorTotal);
    }, 10);
  }

  updateChart(valorTotal: number) {
    this.chartOptions.data[0].dataPoints = [];
    this.eixos.forEach((eixo: any) => {
      this.chartOptions.data[0].dataPoints.push({
        name: eixo.nome,
        y: parseFloat(((eixo.valor / valorTotal) * 100).toFixed(2)),
      });
    });
    this.chart.render();
  }

  getSomatoria(arr: number[]): number {
    return arr.reduce((sum, current) => sum + current, 0);
  }

  limparResultado() {
    this.resultado = {
      mostrar: false,
      valorTotal: 0,
      terraIndigena: '',
      situacaoAlmejada: '',
    };
  }

  openModal(eixo: Eixo) {
    const modalRef = this.modalService.open(ModalDetalhesEixoComponent, {
      size: 'lg',
    });
    modalRef.componentInstance.eixo = eixo;
  }

  downloadPdf() {
    alert('Em Breve!');
  }
}

type NivelImplementacao = {
  text: string;
  value: number;
};
