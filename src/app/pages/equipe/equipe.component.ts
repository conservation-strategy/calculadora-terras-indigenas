import { Component } from '@angular/core';
import { ParceirosComponent } from '../../shared/components/parceiros/parceiros.component';
import { RealizacaoComponent } from '../../shared/components/realizacao/realizacao.component';
import { ApoioComponent } from '../../shared/components/apoio/apoio.component';

@Component({
  selector: 'app-equipe',
  standalone: true,
  imports: [RealizacaoComponent, ApoioComponent, ParceirosComponent],
  templateUrl: './equipe.component.html',
  styleUrl: './equipe.component.scss',
})
export class EquipeComponent {}
