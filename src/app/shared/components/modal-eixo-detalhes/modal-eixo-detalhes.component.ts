import { CommonModule } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { NgbAccordionModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-modal-governanca',
  standalone: true,
  imports: [CommonModule, NgbAccordionModule, TranslateModule],
  templateUrl: './modal-eixo-detalhes.component.html',
  styleUrl: './modal-eixo-detalhes.component.scss',
})
export class ModalEixoDetalhesComponent {
  activeModal = inject(NgbActiveModal);

  @Input() eixo: any;
}
