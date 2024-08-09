import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { CalculadoraService } from '../../core/services/calculadora.service';
import { ApoioComponent } from '../../shared/components/apoio/apoio.component';
import { EixosIlustracao1Component } from '../../shared/components/eixos-ilustracao-1/eixos-ilustracao-1.component';
import { EixosIlustracao2Component } from '../../shared/components/eixos-ilustracao-2/eixos-ilustracao-2.component';
import { EixosIlustracao3Component } from '../../shared/components/eixos-ilustracao-3/eixos-ilustracao-3.component';
import { EixosIlustracao4Component } from '../../shared/components/eixos-ilustracao-4/eixos-ilustracao-4.component';
import { EixosIlustracaoCompletaComponent } from '../../shared/components/eixos-ilustracao-completa/eixos-ilustracao-completa.component';
import { ParceirosComponent } from '../../shared/components/parceiros/parceiros.component';
import { RealizacaoComponent } from '../../shared/components/realizacao/realizacao.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HttpClientModule,
    RealizacaoComponent,
    ApoioComponent,
    ParceirosComponent,
    EixosIlustracaoCompletaComponent,
    EixosIlustracao1Component,
    EixosIlustracao2Component,
    EixosIlustracao3Component,
    EixosIlustracao4Component,
    NgbTooltipModule,
    RouterLink,
    TranslateModule,
  ],
  providers: [CalculadoraService],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  constructor() {}
}
