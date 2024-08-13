import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ApoioComponent } from '../../shared/components/apoio/apoio.component';
import { ParceirosComponent } from '../../shared/components/parceiros/parceiros.component';
import { RealizacaoComponent } from '../../shared/components/realizacao/realizacao.component';

@Component({
  selector: 'app-equipe',
  standalone: true,
  imports: [
    RealizacaoComponent,
    ApoioComponent,
    ParceirosComponent,
    TranslateModule,
  ],
  templateUrl: './equipe.component.html',
  styleUrl: './equipe.component.scss',
})
export class EquipeComponent {}
