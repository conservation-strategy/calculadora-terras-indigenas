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
import { ModalEixoSelecaoComponent } from '../../shared/components/modal-eixo-selecao/modal-eixo-selecao.component';
import { CalculadoraService } from '../../core/services/calculadora.service';
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
  selector: 'app-calculadora-detalhada',
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
  providers: [CalculadoraService, CurrencyPipe],
  templateUrl: './calculadora-detalhada.component.html',
  styleUrl: './calculadora-detalhada.component.scss',
})
export class CalculadoraDetalhadaComponent implements OnInit {
  private modalService = inject(NgbModal);
  faQuestionCircle = faQuestionCircle;

  terrasIndigenas: TerraIndigena[] = [];
  coeficientesRecorrentes: Coeficiente[] = [];
  coeficientesNaoRecorrentes: Coeficiente[] = [];
  eixos: Eixo[] = [];

  terraIndigenaSelecionada: TerraIndigena | null = null;
  atividadeSelecionada: Atividade | null = null;
  eixoSelecionado: Eixo | null = null;

  listaGrauAmeaca: SelectOption[] = [
    { label: 'Baixo', value: 0 },
    { label: 'Médio', value: 1 },
    { label: 'Alto', value: 2 },
    { label: 'Altíssimo', value: 3 },
  ];

  listaComplexidadeAcesso: SelectOption[] = [
    { label: 'Baixo', value: 0 },
    { label: 'Médio', value: 1 },
    { label: 'Alto', value: 2 },
  ];

  listaLocalSede: SelectOption[] = [
    { label: 'Cidade', value: 0 },
    { label: 'Aldeia', value: 1 },
  ];

  listaNivelImplementacaoAtual: SelectOption[] = [
    { label: 'Nula', value: 0 },
    { label: 'Pré-Básico', value: 5 },
    { label: 'Básico', value: 10 },
    { label: 'Intermediario', value: 15 },
    { label: 'Bom', value: 20 },
  ];

  listaNivelImplementacaoAlmejado: SelectOption[] = [
    { label: 'Básico', value: 10 },
    { label: 'Bom', value: 20 },
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
    nivelImplementacaoAtual: new FormControl('', Validators.required),
    nivelImplementacaoAlmejado: new FormControl('', Validators.required),
    inflacao: new FormControl(''),
  });

  erroNivelImplementacao = false;
  mostrarResultado = false;
  resultado: Resultado = {
    terraIndigena: '',
    atividade: '',
    tipoCusto: '',
    valorCusto: 0,
    textoNivelImplementacao: '',
    nivelImplementacaoAtual: 0,
    nivelImplementacaoAlmejado: 0,
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
    const calcularResultado = false;

    const { nivelImplementacaoAtual, nivelImplementacaoAlmejado } =
      this.calculadoraForm.value;

    this.erroNivelImplementacao =
      Number(nivelImplementacaoAtual) > Number(nivelImplementacaoAlmejado);

    if (this.calculadoraForm.valid && !this.erroNivelImplementacao)
      this.calcularResultado();
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
      inflacao,
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
      Number(localSede),
      Number(inflacao)
    );

    this.resultado = {
      terraIndigena: this.terraIndigenaSelecionada?.nome,
      atividade: this.atividadeSelecionada?.nome,
      tipoCusto:
        tipoCusto == '1'
          ? 'recorrente (anual)'
          : 'não recorrente (investimento)',
      valorCusto: valorCusto,
      textoNivelImplementacao:
        Number(nivelImplementacaoAlmejado) == 10 ? 'Básico' : 'Bom',
      nivelImplementacaoAtual: Number(nivelImplementacaoAtual),
      nivelImplementacaoAlmejado: Number(nivelImplementacaoAlmejado),
    };

    this.mostrarResultado = true;
    setTimeout(() => {
      document.getElementById('resultado')?.scrollIntoView();
    }, 10);
  }

  abrirModal() {
    const modalRef = this.modalService.open(ModalEixoSelecaoComponent, {
      size: 'lg',
    });
    modalRef.componentInstance.eixos = this.eixos;

    modalRef.result.then(
      (atividadeEixo: { atividade: Atividade; eixo: Eixo } | null) => {
        if (atividadeEixo) {
          this.atividadeSelecionada = atividadeEixo.atividade;
          this.eixoSelecionado = atividadeEixo.eixo;

          if (this.terraIndigenaSelecionada) {
            const nivelAtual =
              this.terraIndigenaSelecionada.nivelImplementacaoAtual[
                atividadeEixo.atividade.posicao
              ];
            let nivelAjustado = '0';

            if (nivelAtual > 0 && nivelAtual <= 9) nivelAjustado = '5';
            else if (nivelAtual == 10) nivelAjustado = '10';
            else if (nivelAtual > 10 && nivelAtual <= 19) nivelAjustado = '15';
            else if (nivelAtual == 20) nivelAjustado = '20';
            else nivelAjustado = '0';
            this.calculadoraForm.patchValue({
              nivelImplementacaoAtual: nivelAjustado,
            });
          }
        }
      }
    );
  }

  gerarPdf() {
    const dataHora = new Date().toLocaleString();
    const variaveis = this.obterVariaveisUtilizadas();
    const caracteristicasAlteradas = variaveis
      .filter((x) => x.alterada)
      .map((x) => x.variavel);
    const docDefinition = {
      header: [
        {
          text: ['Calculadora Detalhada'],
          alignment: 'center' as Alignment,
          fontSize: 24,
          bold: true,
        },
      ],
      content: [
        '\n',
        {
          text:
            caracteristicasAlteradas.length > 0
              ? [
                  'As características originais da Terra Indígena foram alteradas:',
                  '\n',
                  {
                    text: ` (${caracteristicasAlteradas.join(', ')})`,
                    background: '#fafad2',
                  },
                  '\n\n',
                ]
              : '',
        },
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
        '\n',
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
        '\n',
        {
          text: [
            'Considerando que as métricas do básico e do bom são:',
            '\n',
            'O nível de implementação básico atende ao mínimo necessário para a realização da atividade.',
            '\n',
            'O nível de implementação bom vai um pouco além, adicionando novas ações e melhorias. No entanto, é importante ressaltar que o nível bom, mesmo sendo melhor que o básico, ainda apresenta limitações ou aspectos que precisam ser aprimorados, indicando que há espaço para melhorar o desempenho das atividades',
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
          ],
        },
        '\n',
        {
          ul: variaveis.map((x) => {
            return {
              text: [
                {
                  text: `${x.variavel}: `,
                  bold: true,
                },
                String(x.valor),
                {
                  text: x.alterada ? ' (Informação alterada pelo usuário)' : '',
                  // color: 'red',
                  background: '#fafad2',
                },
              ],
            };
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
          text: `Relatório gerado em ${dataHora} IP: ${this.ipUsuario}\n https://conservation-strategy.github.io/calculadora-terras-indigenas`,
          alignment: 'center' as Alignment,
        },
      ],
    };
    pdfMake.createPdf(docDefinition).download('Calculadora Detalhada');
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
        variavel: 'Tamanho TI',
        valor: String(tamanho),
        alterada: tamanho != this.terraIndigenaSelecionada?.tamanho,
      },
      {
        variavel: 'Número de aldeias',
        valor: String(aldeias),
        alterada: aldeias != this.terraIndigenaSelecionada?.aldeias,
      },
      {
        variavel: 'População',
        valor: String(populacao),
        alterada: populacao != this.terraIndigenaSelecionada?.populacao,
      },
      {
        variavel: 'Grau de diversidade',
        valor: String(grauDiversidade),
        alterada:
          grauDiversidade != this.terraIndigenaSelecionada?.grauDiversidade,
      },
      {
        variavel: 'Grau de ameaça',
        valor: this.listaComplexidadeAcesso.find(
          (x) => x.value === Number(grauAmeaca)
        )?.label,
        alterada: grauAmeaca != this.terraIndigenaSelecionada?.grauAmeaca,
      },
      {
        variavel: 'Complexidade de acesso',
        valor: this.listaComplexidadeAcesso.find(
          (x) => x.value === Number(complexidadeAcesso)
        )?.label,
        alterada:
          complexidadeAcesso !=
          this.terraIndigenaSelecionada?.complexidadeAcesso,
      },
      {
        variavel: 'Localização da sede da associação',
        valor: this.listaLocalSede.find((x) => x.value === Number(localSede))
          ?.label,
        alterada: localSede != this.terraIndigenaSelecionada?.localSede,
      },
    ];
  }
}

type SelectOption = {
  label: string;
  value: number;
};

type Resultado = {
  terraIndigena: string | undefined;
  atividade: string | undefined;
  tipoCusto: string | undefined;
  valorCusto: number;
  textoNivelImplementacao: string;
  nivelImplementacaoAtual: number;
  nivelImplementacaoAlmejado: number;
};

type Variavel = {
  variavel: string;
  valor?: string;
  alterada: boolean;
};
