import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-form-detalhes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal-form-detalhes.component.html',
  styleUrl: './modal-form-detalhes.component.scss',
})
export class ModalFormDetalhesComponent {
  activeModal = inject(NgbActiveModal);

  @Input() campo: string = '';
  @Input() tooltip: string = '';
}
