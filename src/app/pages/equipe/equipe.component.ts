import { Component } from '@angular/core';
import { PageTitleComponent } from '../../core/layout/page-title/page-title.component';
import { ParceirosComponent } from '../../shared/components/parceiros/parceiros.component';
import { RealizacaoComponent } from '../../shared/components/realizacao/realizacao.component';
import { ApoioComponent } from '../../shared/components/apoio/apoio.component';

@Component({
  selector: 'app-equipe',
  standalone: true,
  imports: [
    PageTitleComponent,
    RealizacaoComponent,
    ApoioComponent,
    ParceirosComponent,
  ],
  templateUrl: './equipe.component.html',
  styleUrl: './equipe.component.scss',
})
export class EquipeComponent {}
