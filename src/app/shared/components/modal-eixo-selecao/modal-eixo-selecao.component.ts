import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import Atividade from '../../../core/models/Atividade';
import Eixo from '../../../core/models/Eixo';

@Component({
  selector: 'app-modal-eixo-selecao',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './modal-eixo-selecao.component.html',
  styleUrl: './modal-eixo-selecao.component.scss',
})
export class ModalEixoSelecaoComponent {
  activeModal = inject(NgbActiveModal);

  @Input() eixos: Eixo[] = [];
  atividadeSelecionada: Atividade | null = null;
  eixoSelecionado: Eixo | null = null;

  formularioEnviado = false;
  formulario = new FormGroup({
    atividade: new FormControl<Atividade | null>(null, Validators.required),
  });

  selecionarAtividade() {
    const atividade = this.formulario.controls.atividade.value;
    const eixo: any = this.eixos.find((e: Eixo) =>
      e.atividades.find((a: Atividade) => a.posicao == atividade!.posicao)
    );
    this.atividadeSelecionada = atividade;
    this.eixoSelecionado = eixo;
  }

  continuar() {
    this.activeModal.close({
      atividade: this.atividadeSelecionada,
      eixo: this.eixoSelecionado,
    });
  }

  fechar() {
    this.activeModal.close(null);
  }
}
