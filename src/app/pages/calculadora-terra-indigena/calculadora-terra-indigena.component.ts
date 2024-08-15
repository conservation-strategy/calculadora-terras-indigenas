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
import SelectOption from '../../core/models/SelectOption';
import { LoadingComponent } from '../../shared/components/loading/loading.component';
import { ModalFormDetalhesComponent } from '../../shared/components/modal-form-detalhes/modal-form-detalhes.component';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

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
  providers: [CalculadoraService, CurrencyPipe, TranslateService],
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
      textoNivelImplementacaoAlmejado:
        this.listaNivelImplementacaoAlmejado.find(
          (nivel: any) => nivel.value == Number(nivelImplementacaoAlmejado)
        )!.label,
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
      const docDefinition = {
        pageMargins: [50, 80, 50, 40] as Margins,
        info: {
          title: 'Calculadora do Custo de Gestão de Terras Indígenas',
          author: 'CSF',
          subject: 'Calculadora do Custo de Gestão de Terras Indígenas',
        },
        header: {
          columns: [
            {
              margin: 5,
              alignment: 'center' as Alignment,
              image:
                'data:image/png;base64,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',
            },
            {
              margin: 5,
              alignment: 'center' as Alignment,
              image:
                'data:image/png;base64,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',
            },
            {
              margin: 5,
              alignment: 'center' as Alignment,
              image:
                'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIIAAAAjCAQAAADySho9AAAAIGNIUk0AAHomAACAhAAA+gAAAIDoAAB1MAAA6mAAADqYAAAXcJy6UTwAAAACYktHRAD/h4/MvwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB+gIBhMnHh1ytX0AAAOSelRYdFJhdyBwcm9maWxlIHR5cGUgeG1wAABIx51WSZLbMAy88xV5ggSQgPgcWcstVTnm+ekGbWuxPPHMqEaSuTQajYVKf3//Sb/w1+dSk066+uCd9aZ2s+JZOhMr5lZt0VlkWW+32yqC8WqZI8W15Fm7PHuXFWsHqykPPjo2FvUxLyUbngBUxSYRXXWRTicfdPTBsNFmGrNeOv62yRZXziVaAJtsK3no2Caey4PJBoOxG3fk5w7pypDn0iUhudVjSKss2ssMPh0uWFXnmPU6wKmMX0VVJoyL8l9lxZN3SXjAW4VNLDLcVV260yV3BwU8sKZIztmOzqX7JB0cPOPqdIRDq8efLI5V4ETODsu9Vl7BRMgE95kYyQwv6ogQNfEBjsEC548sQAHBQijEamhVoRFWPOYThBbYg7Rk1aTdR4MSv/INY8sWJFkSsme1Ga4M4NORPATvHtHaILFFLwToQEFsItDdey7EvWBjYfDpqusduH8FRkYN2AtGcBhv6TPiT96n7ZsP6cJW6JJnFME3TKSzNgCcL8DVcy5uLSRX4OnSgRM4a9QRdKxZi0QarCEyCpbwVDSh2vVhnzYyM6UAiDpIoZHVppf6etEqRd1kWGZhDCWaBzcgrVXqGxMl5/akgVZ3CSCsNd4BWDKKAJuUT94tZqESy/gAOxtTppp5JWw64r6FZTn399lL2NT6jjWq/SvlT6HTAztKYDSLTJ8JF4GufEfbLZGMC2qAPF6kBhDbGrIF2+9eNza7SEZqjpn9QYP9EmGHMlzZ1jCParT08Bog6AUgXRGg2Zgfyo6Jzqia2XDQKY0uC6uRb1iE2awDq1+jzZwZMGfUnwX8YHDo77GmEUlX/sKumIRqBe8lhMYxE8lAw+izeKvG5sxW2JNRrwXueDR2AKB72ws7BqC2kw6Mpiu2aS9YJBj1gjqhS41jgYygVQhA5Qya8MgYMNZTOZABUAYTCsx4VR4/uvXrPSucphE1sPN6OlUQxeT9cRCpUOHY1jZGHuaPZh9y72qOp3FbnZ7L/5MnzzR543b6yu9rt4983RFr9qMPqupdH9jDKU4RNIIM3J6e56grhvT/rezYydJFK1u/Kz+g0Y9sr/23pX9WaPpZiR4qNAiko/Y/75XpqP3Ppf/kFNlrx23UjQba98vawkOgSdZ91TyKJg7KL2tt24fqv/p8Oi9rn3ob/PkLlzPX39mF7kW4pX0ip3+6cKiZHTCMCQAACklJREFUaN7d2XmQ1dWVB/DP7y290U03TXfT0CBLC6KgsggRXEBARxZxi0pwGWsmM8Zt4piYqRijjqXGpGYqximjJhM0QUcTFRDEBFFBQBQFRGwUAaGFZumWphfovd9784dtVy+gELGw/N6q937n3nPvu+d7f/fce84zCkl5brbCAU2HXZrFlHreldJ9GxD0Cv6sXuLvKtV+I+tYW/CVEcrx9N9JwOflvyQfayu+Kq5T286kJm+4x7YjIKHC+cfaiK+KV9oZVGuuIXrZfAiDm1WpEutQ+5jIsTbjqyBiRBupyWZ5esiU30lzh9eVCIspluZKI9u0FYpobpUCgYRAQuIwZhAySoZlGo8lCV3bSFtkyLVfnlA7rUZzLDLQUH2lmpN0e2N2OxLaaw9ylUDgRW8exgyy/UGS8XYdSxJela1AT3ziVT+wQ6nBwu20nvWE3ypsMTbemGFgu/bKdmveoMCVXvPMF/5yrgvMVaHeQlWqcbawJQfRnKrU6q+XhB/oK8mJJlkgIqxGuVMltdGpNscu0RYKtnnepHauMO4VDW3kYi+43Ovel6m7elE97bNZQlRfx9lvqzrT3WCHIhUekqZJb3f6wCf2i8iwS1w+thvkFq+qtlONHIXSbbJT/OjScK4i85wnDZM1myW7g7OscgX+Va2EmLv1t65d+2t6dxjzUjVuF3a3UovMtdVWY4Tcaplfet2DxtuoynJ3ucBqaw12j3pbzPN98202whTbvaTAY5q9b77hRnrRbE95z0WCo0vCSC9L2GqK/mapM8UEuzt4/1sxXomENQr9os3pUOtJ401v9+Z8TgKX+NRLTnaTKvfLsMkqA4x1he5eVGScbCd6x4d6O8deDymQ4wk7nKanVZbpZqZGd+mtwHxr5Mj3pjVyjiYFIbf5lfsc8H/WmOl/vevaTmdDCN10Ue9Bo133uW+w1m3mu8bog5wDAYpU2eF9a1XLVO81wz3rVEuVq9Fkp32KbRNoslezajvtVSGBPfYKxHyKSiW6G+dtFcqtUqjX0SQh4mID/dEPDfA9I2wRstFsGQboISIibKvXFLheloXe9ZRu6tV43xJNTjDACxZrOujoYUGLi42jyV22uc5vnOYmQQtRoZankKDlJQ+1fIZorSMiueU2EjuaBHw2dMwIQ63wsP8xxtlGCqu33N/EdZHsgG2y3OFcVKq1yccqlelttGIbRF0k3dPtXFWsxeyYROtzXJJzzPYXD5soX7MukgUS4hJiYuKShYXUSJUqKkm8xeA0gQobjdRVkxN8ZOfRJQGSTHCWKh/YrES5viY7XrI6NQ5IUtgSJE0R9kmQnRglsMAShb7vVGGDzFHXOuYgM3Ge5YbINMwI06Q7zen+3TRvSLPYbhtNdY9XlTpRtovNtc9kXczxuuv9h616iTrVXiUu18vvPOQO9zugp3uUH00SArVS29XstV2RdaqFRYXlG2dsO40dHrfOGaa33hzeNLENCb2MFRf2ga4K8J7+MgTWSjVGuo1WqdDDdCHLpBqAMsuNdbptlqk2wcnWiRjqRZuNM0yRFZqcYowGy2w+2lui9hAxQqN62/3NbCvbtXzofDfa0q5uZQciv5j2byAOTsKhy+/16BRjHgkJ30AcefSXGoQTDR3qOq9uIFmgSewLgqiwGfr6k5IjnEGyAXortrlFznC1NI+oOWJbchRK9t7hvAnNqsVbpeUGeriDxlIp7Qbv6X5Petxc075gCrlet8eZRzz1nh6xx02t8mA7rNfjS3olHSQDNl2RZU4+HBLm+0MbEkqNdaGmdhqzRdut1GPecYI8j/v5F/iAwD+4sAN9h4PAaNVubZVTXWpSh5CvM6a6t9Nckjxng2Ffvh3KPOyqNt1z9bNBsePb6Kxrk00gy0CBCmXuE5GQ4mxnCVtiqSYRZzhHV+vNc0Af3eyW6xIDVJhjk67GGyXNSgsFTjPYWuP0tFCNqeKesUmDZkPcLc08qySr1F9ETD9T9bXFs5p8R38bnCnLPKsVulme3TZYb5JhIpZarFGDBGE/a7eKnfGclX4sEwkb7NJTjb8Y5uRWjQN+aXubHg36+a7BSqyzV8RP/JtXZPm5Kmv92I+slm+arX5nrL8Km6Wfl13kGssc72J1BviRnRr81hX6yDLFTPm6u8JQ83R3rf2KTXKNIgPNMtQfDfKYBuv9UC8VHnSZAllmOMkK55gpotynjjNRjWFusd4ml8o358u2Q8wNZohLiJtnqDPs87F8V9jfqrO4U6yR5xf22eF+eUbY5lH09qalvqPYvcgzRbrZthjhBvuNxxTNfioqIs3pKvxeqv9U7Sr8WqUpkj1lpwKnqHALzrLPr+VbpEhXj/jQWXIt8I5cv9LoLPzJTiNlW2mhCJJFpLlAnfuEPKXoy7dDmWIzBeLmeVCu9d4yyYWetLTF6dV73p5Ove600E/cKttbcpXhU7sNNFmGXSjzEqrEpRou7hOUqzdQpqnOlyZVVMwBjepRIYYmZSItXiSMjSrlCKnQS5qT9PAzTXJsEFcprga7hEWFBELCmmWa4QwZwpI+3+SRLzkkd9pjGN51p+uNNMMik/2zRf7bcAV4w3Md+mQ5z2IrfGCWSd4Xl4aIqFr7RDt46ZhaYZkIiSj3Pbe72xpjWg7XoPWQ/Sxn+XnmMoEkYaVqBGgSt8cDPhGoUyXUoqP1+7M45kbXuE25s1udfTxkgbJOeZq4RjUqlFqsQE/1HnCya50Q9FRkn1Fuscq9im1xn70demf4JxMlCatX5g1bjNbHKQZaaoESl5uo0ChdpYmKWCHhImlGq/Ki/qI+kiYqJEWqsHSki0iXIlVEukBImohp6vxVVJpkEW8a4DRxKbKFpAnrKqKLsAyNGnVziiGGiNkiU0REF6mSdAt72SorrbQ8WBIs9YpF5pvnBXPN8YynXe58Szztp06QGqwO3jZBb0NsTHoytsrz3upEYdhJZhjhYl3db6XdzjTe2d7zgBJ7nekSZ8qTMF2SsOfUmW60YR6yUJPTTXGcQJ4y58iSUOoqSRJqXCRZow1GO8lwIzxqge+aKKraM7q52nnGqVXrSikaxVwqWeBlxznfcHu8a4LJeojKlHCGZL0CF9ujUoPmoDkI4mFRSaJS5eijxmKPmuZG+8yWjDn+0SyXYXHKZY1VB031BbLk6yJml1LQW55GW9Ui0Ee2mBIhOeIStorqJ1257eJC+shWqVmWcmkCCeV6iImr1g2NdsuTLarcNvSSIaFOiS6Ok+KA7aLy0Wy/bAlxxTL00WyHOv10VS4kXbUUCVH2alTmA6sss8Jqm5Sq1aRZwmJTlFmnn4Ut++dj+R6TkLBGH98SRLxtsly5B21dIVWuZ3VxYktNpkL7QVHLKn8LEPLnQwYe+xUZo8Fc41rzySn6Wa7SM+44lv8ZHW1088QhLkorDbHWuwa10ah3tS7OPbrZ3m8C8jx5kHtjnZudaJfbDVbUUrffC0461tP9utDdv1hkp0oHWspHbpFigtVOl2Oefd7xoEsVHOupfh34fxV4q9RPxIl9AAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDI0LTA4LTA2VDE5OjM3OjE0KzAwOjAwU0wz+AAAACV0RVh0ZGF0ZTptb2RpZnkAMjAyNC0wOC0wNlQxOTozNzoxNCswMDowMCIRi0QAAAAodEVYdGRhdGU6dGltZXN0YW1wADIwMjQtMDgtMDZUMTk6Mzk6MzArMDA6MDDdp7lGAAAAAElFTkSuQmCC',
            },
          ],
        },
        content: [
          {
            text: [
              'O cálculo abaixo foi realizado utilizando a ',
              {
                text: 'Calculadora do Custo de Gestão de Terras Indígenas',
                bold: true,
              },
              ' da calculadora.',
            ],
          },

          '\n',
          'Calcula o custo total de implementação de todos os eixos temáticos em uma Terra Indígena selecionada, podendo o usuário alterar os valores das características da Terra Indígena (tamanho, população, aldeia, complexidade de acesso, grau de ameaça, grau de diversidade e localização da sede da associação) e também definir o nível de implementação atual e desejado.',
          '\n',
          'Essa versão é indicada para usuários que buscam informações mais detalhadas sobre a definição dos níveis de implementação dos eixos temáticos. Nessa versão não é possível selecionar apenas um eixo temático, nem mais de uma Terra Indígena.',
          '\n',
          {
            text: [
              'O custo previsto para os eixos temáticos, com o nível de implementação ',
              {
                text: this.resultado.textoNivelImplementacaoAlmejado,
                bold: true,
              },
              ' na ',
              {
                text: this.resultado.terraIndigena,
                bold: true,
              },
              ' é de:',
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
                ? ' /ano'
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
                    text: 'Parâmetros',
                    bold: true,
                  },
                  {
                    text: 'Valores',
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
                            ? ` (Informação alterada pelo usuário. Valor original: ${x.valorOriginal})`
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
                      ? ' /ano'
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
                                { text: 'Básico: ', bold: true },
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
                                { text: 'Bom: ', bold: true },
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
            text: 'A CSF, o ISA e a Rede Xingu+ não se responsabilizam pelas consequências do uso da calculadora.',
          },
          '\n',
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
      };

      pdfMake
        .createPdf(docDefinition)
        .download('Calculadora do Custo de Gestão de Terras Indígenas');
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

    const selectGrauAmeaca = this.listaGrauAmeaca.find(
      (x) => x.value === Number(this.terraIndigenaSelecionada?.grauAmeaca)
    );
    const selectComplexidadeAcesso = this.listaComplexidadeAcesso.find(
      (x) =>
        x.value === Number(this.terraIndigenaSelecionada?.complexidadeAcesso)
    );
    const selectLocalSede = this.listaLocalSede.find(
      (x) => x.value === Number(this.terraIndigenaSelecionada?.localSede)
    );

    return [
      {
        name: 'land-size',
        variavel: 'Tamanho',
        valor: Number(tamanho).toLocaleString('pt-BR'),
        valorOriginal: String(
          this.terraIndigenaSelecionada &&
            this.terraIndigenaSelecionada.tamanho > 0
            ? this.terraIndigenaSelecionada?.tamanho.toLocaleString('pt-BR')
            : 'sem informação'
        ),
        alterada: tamanho != this.terraIndigenaSelecionada?.tamanho,
      },
      {
        name: 'peoples',
        variavel: 'Número de povos',
        valor: String(grauDiversidade),
        valorOriginal: String(
          this.terraIndigenaSelecionada &&
            this.terraIndigenaSelecionada.grauDiversidade > 0
            ? this.terraIndigenaSelecionada.grauDiversidade.toLocaleString(
                'pt-BR'
              )
            : 'sem informação'
        ),
        alterada:
          grauDiversidade != this.terraIndigenaSelecionada?.grauDiversidade,
      },
      {
        name: 'villages',
        variavel: 'Número de aldeias',
        valor: String(aldeias),
        valorOriginal: String(
          this.terraIndigenaSelecionada &&
            this.terraIndigenaSelecionada.aldeias > 0
            ? this.terraIndigenaSelecionada.aldeias.toLocaleString('pt-BR')
            : 'sem informação'
        ),
        alterada: aldeias != this.terraIndigenaSelecionada?.aldeias,
      },
      {
        name: 'population',
        variavel: 'População',
        valor: Number(populacao).toLocaleString('pt-BR'),
        valorOriginal: String(
          this.terraIndigenaSelecionada &&
            this.terraIndigenaSelecionada.populacao > 0
            ? this.terraIndigenaSelecionada.populacao.toLocaleString('pt-BR')
            : 'sem informação'
        ),
        alterada: populacao != this.terraIndigenaSelecionada?.populacao,
      },
      {
        name: 'degree-of-threat',
        variavel: 'Grau de ameaça',
        valor: String(
          this.listaGrauAmeaca.find((x) => x.value === Number(grauAmeaca))
            ?.label
        ),
        valorOriginal: String(
          selectGrauAmeaca ? selectGrauAmeaca.label : 'sem informação'
        ),
        alterada: grauAmeaca != this.terraIndigenaSelecionada?.grauAmeaca,
      },
      {
        name: 'complexity-of-access',
        variavel: 'Complexidade de acesso',
        valor: String(
          this.listaComplexidadeAcesso.find(
            (x) => x.value === Number(complexidadeAcesso)
          )?.label
        ),
        valorOriginal: String(
          selectComplexidadeAcesso
            ? selectComplexidadeAcesso.label
            : 'sem informação'
        ),
        alterada:
          complexidadeAcesso !=
          this.terraIndigenaSelecionada?.complexidadeAcesso,
      },
      {
        name: 'headquarters',
        variavel: 'Localização da sede da associação',
        valor: String(
          this.listaLocalSede.find((x) => x.value === Number(localSede))?.label
        ),
        valorOriginal: String(
          selectLocalSede ? selectLocalSede.label : 'sem informação'
        ),
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

    return {
      id: eixo.id,
      nome: eixo.nome,
      descricao: eixo.descricao,
      valor: eixo.valor,
      atividades: atividades.map((atividade: Atividade) => {
        return {
          id: atividade.id,
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
          metricaBasico: atividade.metricaBasico.filter(
            (x) => x.recorrente == isRecorrente
          ),
          metricaBom: atividade.metricaBom.filter(
            (x) => x.recorrente == isRecorrente
          ),
        };
      }),
    };
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
