import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-modal-form-detalhes',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './modal-form-detalhes.component.html',
  styleUrl: './modal-form-detalhes.component.scss',
})
export class ModalFormDetalhesComponent {
  activeModal = inject(NgbActiveModal);

  @Input() type: string = '';
  @Input() title: string = '';
  @Input() description: string = '';
}
