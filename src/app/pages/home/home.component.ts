import { Component } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CalculadoraListaComponent } from '../../shared/components/calculadora-lista/calculadora-lista.component';
import { RealizacaoComponent } from '../../shared/components/realizacao/realizacao.component';
import { ApoioComponent } from '../../shared/components/apoio/apoio.component';
import { ParceirosComponent } from '../../shared/components/parceiros/parceiros.component';
import { CalculadoraService } from '../../core/services/calculadora.service';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HttpClientModule,
    CalculadoraListaComponent,
    RealizacaoComponent,
    ApoioComponent,
    ParceirosComponent,
    NgbTooltipModule,
    RouterLink,
  ],
  providers: [CalculadoraService],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  youtubeVideoUrl: any;
  constructor() {}
}
