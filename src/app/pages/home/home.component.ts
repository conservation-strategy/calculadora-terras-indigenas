import { Component } from '@angular/core';
import { CalculatorListComponent } from '../../shared/components/calculator-list/calculator-list.component';
import { RealizacaoComponent } from '../../shared/components/realizacao/realizacao.component';
import { ApoioComponent } from '../../shared/components/apoio/apoio.component';
import { ParceirosComponent } from '../../shared/components/parceiros/parceiros.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CalculatorListComponent,
    RealizacaoComponent,
    ApoioComponent,
    ParceirosComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
