import { CommonModule } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Eixo } from '../../core/models/Eixo';

@Component({
  selector: 'app-modal-governanca',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal-detalhes-eixo.component.html',
  styleUrl: './modal-detalhes-eixo.component.scss',
})
export class ModalDetalhesEixoComponent {
  activeModal = inject(NgbActiveModal);

  @Input() eixo: Eixo | null = null;
}
