import { Component, OnInit, inject } from '@angular/core';
import { HeaderComponent } from '../../core/layout/header/header.component';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  NgbAccordionModule,
  NgbModal,
  NgbTooltipModule,
} from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { faQuestionCircle } from '@fortawesome/free-regular-svg-icons';
import TerraIndigena from '../../core/models/TerraIndigena';
import { CalculatorService } from '../../core/services/calculator.service';
import Coeficiente from '../../core/models/Coeficiente';
import { Atividade, Eixo } from '../../core/models/Eixo';
import { ModalSelecaoEixoComponent } from '../../shared/modal-selecao-eixo/modal-selecao-eixo.component';

@Component({
  selector: 'app-calculator-detailed',
  standalone: true,
  imports: [
    HeaderComponent,
    CommonModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    NgbTooltipModule,
    NgbAccordionModule,
    HttpClientModule,
  ],
  providers: [CalculatorService],
  templateUrl: './calculator-detailed.component.html',
  styleUrl: './calculator-detailed.component.scss',
})
export class CalculatorDetailedComponent implements OnInit {
  private modalService = inject(NgbModal);
  faQuestionCircle = faQuestionCircle;

  terrasIndigenas: TerraIndigena[] = [];
  coeficientesRecorrentes: Coeficiente[] = [];
  coeficientesNaoRecorrentes: Coeficiente[] = [];
  eixos: Eixo[] = [];

  terraIndigenaSelecionada: TerraIndigena | null = null;
  atividadeSelecionada: Atividade | null = null;

  listaGrauAmeaca: selectOption[] = [
    { label: 'Baixo', value: 0 },
    { label: 'Médio', value: 1 },
    { label: 'Alto', value: 2 },
    { label: 'Altíssimo', value: 3 },
  ];

  listaComplexidadeAcesso: selectOption[] = [
    { label: 'Baixo', value: 0 },
    { label: 'Médio', value: 1 },
    { label: 'Alto', value: 2 },
  ];

  listaLocalSede: selectOption[] = [
    { label: 'Aldeia', value: 0 },
    { label: 'Cidade', value: 1 },
  ];

  calculadoraFormEnviado = false;
  calculadoraForm = new FormGroup({
    terraIndigena: new FormControl('', Validators.required),
    tamanho: new FormControl('', Validators.required),
    aldeias: new FormControl('', Validators.required),
    populacao: new FormControl('', Validators.required),
    grauDiversidade: new FormControl('', Validators.required),
    grauAmeaca: new FormControl('', Validators.required),
    complexidadeAcesso: new FormControl('', Validators.required),
    localSede: new FormControl('', Validators.required),
    tipoCusto: new FormControl('', Validators.required),
    nivelImplementacaoAtual: new FormControl('', Validators.required),
    nivelImplementacaoAlmejado: new FormControl('', Validators.required),
  });

  mostrarResultado = false;
  resultado: Resultado = {
    terraIndigena: '',
    atividade: '',
    tipoCusto: '',
    valorCusto: 0,
    nivelImplementacaoAtual: 0,
    nivelImplementacaoAlmejado: 0,
  };

  constructor(private calculatorService: CalculatorService) {}

  ngOnInit() {
    this.getTerrasIndigenas();
    this.getCoeficientes();
    this.getEixos();
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
        this.coeficientesRecorrentes = response;
      });

    this.calculatorService
      .getCoeficientesNaoRecorrentes()
      .subscribe((response) => {
        this.coeficientesNaoRecorrentes = response;
      });
  }

  getEixos() {
    this.calculatorService.getEixos().subscribe((response) => {
      this.eixos = response;
    });
  }

  selecionarTerraIndigena() {
    const terraIndigena: any =
      this.calculadoraForm.controls.terraIndigena.value;
    
      this.calculadoraForm.patchValue({
      tamanho: terraIndigena.tamanho,
      aldeias: terraIndigena.aldeias,
      populacao: terraIndigena.populacao,
      grauDiversidade: terraIndigena.grauDiversidade,
      grauAmeaca: terraIndigena.grauAmeaca,
      complexidadeAcesso: terraIndigena.complexidadeAcesso,
      localSede: terraIndigena.localSede,
    });
    this.terraIndigenaSelecionada = terraIndigena;
  }

  botaoCalcular() {
    this.calculadoraFormEnviado = true;
    this.mostrarResultado = false;

    if (this.calculadoraForm.valid) this.calcularResultado();
  }

  calcularResultado() {
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
    } = this.calculadoraForm.value;

    const resultados = this.calculatorService.calcularCoeficientes(
      tipoCusto == '1'
        ? this.coeficientesRecorrentes
        : this.coeficientesNaoRecorrentes,
      Number(nivelImplementacaoAlmejado),
      Number(nivelImplementacaoAtual),
      Number(tamanho),
      Number(populacao),
      Number(aldeias),
      Number(grauDiversidade),
      Number(localSede),
      Number(grauAmeaca),
      Number(complexidadeAcesso)
    );

    const posicao = this.atividadeSelecionada? this.atividadeSelecionada.posicao : 0;

    this.resultado = {
      terraIndigena: this.terraIndigenaSelecionada?.nome,
      atividade: this.atividadeSelecionada?.nome,
      tipoCusto: tipoCusto == '1' ? 'recorrente' : 'não recorrente',
      valorCusto: resultados[posicao],
      nivelImplementacaoAtual: Number(nivelImplementacaoAtual),
      nivelImplementacaoAlmejado: Number(nivelImplementacaoAlmejado),
    };

    this.mostrarResultado = true;
  }

  openModal() {
    const modalRef = this.modalService.open(ModalSelecaoEixoComponent, {
      size: 'lg',
    });
    modalRef.componentInstance.eixos = this.eixos;

    modalRef.result.then((atividade) => {
      if (atividade) this.atividadeSelecionada = atividade;
    });
  }

  downloadPdf() {
    alert('Em Breve!');
  }
}

type selectOption = {
  label: string;
  value: number;
};

type Resultado = {
  terraIndigena: string | undefined;
  atividade: string | undefined;
  tipoCusto: string | undefined;
  valorCusto: number;
  nivelImplementacaoAtual: number;
  nivelImplementacaoAlmejado: number;
};
