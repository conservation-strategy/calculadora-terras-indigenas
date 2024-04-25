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
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { faQuestionCircle } from '@fortawesome/free-regular-svg-icons';

import { HeaderComponent } from '../../core/layout/header/header.component';
import { ModalSelecaoEixoComponent } from '../../shared/components/modal-selecao-eixo/modal-selecao-eixo.component';
import { CalculatorService } from '../../core/services/calculator.service';
import { NumbersOnlyDirective } from '../../shared/numbers-only.directive';
import { rangeValidator } from '../../shared/range.validator';

import TerraIndigena from '../../core/models/TerraIndigena';
import Coeficiente from '../../core/models/Coeficiente';
import Atividade from '../../core/models/Atividade';
import Eixo from '../../core/models/Eixo';

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { Alignment } from 'pdfmake/interfaces';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-calculator-detailed',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    NgbTooltipModule,
    NgbAccordionModule,
    HeaderComponent,
    NumbersOnlyDirective,
  ],
  providers: [CalculatorService, CurrencyPipe],
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
    tamanho: new FormControl<number | 0>(0, { nonNullable: true }),
    populacao: new FormControl<number>(0, Validators.required),
    aldeias: new FormControl('', Validators.required),

    grauDiversidade: new FormControl('', Validators.required),
    grauAmeaca: new FormControl('', Validators.required),
    complexidadeAcesso: new FormControl('', Validators.required),
    localSede: new FormControl('', Validators.required),
    tipoCusto: new FormControl('', Validators.required),
    nivelImplementacaoAtual: new FormControl('', [
      Validators.required,
      rangeValidator(0, 20),
    ]),
    nivelImplementacaoAlmejado: new FormControl('', [
      Validators.required,
      rangeValidator(0, 20),
    ]),
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
  ipUsuario = '';

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

    const atividade = this.atividadeSelecionada
      ? this.atividadeSelecionada.posicao
      : 0;
    const coeficientes =
      tipoCusto == '1'
        ? this.coeficientesRecorrentes
        : this.coeficientesNaoRecorrentes;

    const valorCusto = this.calculatorService.calculadoraDetalhada(
      coeficientes,
      atividade,
      Number(nivelImplementacaoAtual),
      Number(nivelImplementacaoAlmejado),
      Number(tamanho),
      Number(populacao),
      Number(aldeias),
      Number(grauDiversidade),
      Number(grauAmeaca),
      Number(complexidadeAcesso),
      Number(localSede)
    );

    this.resultado = {
      terraIndigena: this.terraIndigenaSelecionada?.nome,
      atividade: this.atividadeSelecionada?.nome,
      tipoCusto: tipoCusto == '1' ? 'recorrente' : 'não recorrente',
      valorCusto: valorCusto,
      nivelImplementacaoAtual: Number(nivelImplementacaoAtual),
      nivelImplementacaoAlmejado: Number(nivelImplementacaoAlmejado),
    };

    this.mostrarResultado = true;
    setTimeout(() => {
      document.getElementById("resultado")?.scrollIntoView();
    }, 10);
  }

  abrirModal() {
    const modalRef = this.modalService.open(ModalSelecaoEixoComponent, {
      size: 'lg',
    });
    modalRef.componentInstance.eixos = this.eixos;

    modalRef.result.then((atividade) => {
      if (atividade) {
        this.atividadeSelecionada = atividade;
        this.calculadoraForm.patchValue({
          nivelImplementacaoAtual:
            this.terraIndigenaSelecionada?.nivelImplementacaoAtual[
              atividade.posicao
            ].toString(),
        });
      }
    });
  }

  gerarPdf() {
    const dataHora = new Date().toLocaleString();
    var docDefinition = {
      content: [
        {
          text: [
            'O custo',
            { text: ` ${this.resultado.tipoCusto} `, bold: true },
            'previsto para',
            { text: ` ${this.resultado.atividade} `, bold: true },
            'na Terra Indígena',
            { text: ` ${this.resultado.terraIndigena} `, bold: true },
            'com o nível de implementação',
            { text: ` ${this.resultado.nivelImplementacaoAtual} `, bold: true },
            'para',
            {
              text: ` ${this.resultado.nivelImplementacaoAlmejado} `,
              bold: true,
            },
            'é de:',
          ],
        },
        '\n\n',
        {
          text: `${this.currencyPipe.transform(
            this.resultado.valorCusto,
            'BRL',
            'symbol',
            '1.0-0'
          )}`,
          fontSize: 20,
          bold: true,
        },
        '\n\n',
        {
          text: [
            'Considerando que as métricas do básico e do bom são:',
            '{Texto do nível de implementação básico}',
            '{Texto do nível de implementação bom}.',
          ],
        },
        '\n',
        {
          text: [
            'Importante ressaltar que as “métricas”, ou seja, o que a Terra Indígena precisa ter para estar no nível de implementação básico ou bom, foram construídas apenas para estes níveis. ',
            'Caso o usuário defina um valor diferente de 10 ou 20 será necessário avaliar o conjunto de métricas para identificar quais custos o resultado poderá abranger.',
          ],
        },
        '\n',
        {
          text: [
            'O valor acima foi construído a partir das seguintes variáveis:',
            '{Lista com todas as variáveis, como na calculadora do Garimpo}',
          ],
        },
        '\n',
        {
          ul: [
            'item 1',
            {
              text: 'item 2 (Informação alterada pelo usuário)',
              color: 'red',
            },
            'item 3',
            'item 4',
            {
              text: 'item 5 (Informação alterada pelo usuário)',
              color: 'red',
            },
            'item 6',
          ],
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
          text: `Relatório gerado em ${dataHora} por ${this.ipUsuario}\n https://conservation-strategy.github.io/calculadora-terras-indigenas`,
          alignment: 'center' as Alignment,
        },
      ],
    };
    pdfMake.createPdf(docDefinition).download('Calculadora Detalhada');
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
