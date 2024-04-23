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
  selector: 'app-modal-selecao-eixo',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './modal-selecao-eixo.component.html',
  styleUrl: './modal-selecao-eixo.component.scss',
})
export class ModalSelecaoEixoComponent {
  activeModal = inject(NgbActiveModal);

  @Input() eixos: Eixo[] = [];
  atividadeSelecionada: Atividade | null = null;

  formularioEnviado = false;
  formulario = new FormGroup({
    atividade: new FormControl('', Validators.required),
  });

  selecionarAtividade() {
    const atividade: any = this.formulario.controls.atividade.value;
    this.atividadeSelecionada = atividade;
  }

  continuar() {
    this.activeModal.close(this.atividadeSelecionada);
  }

  fechar() {
    this.activeModal.close(false);
  }
}
