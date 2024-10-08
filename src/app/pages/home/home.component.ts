import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { CalculadoraService } from '../../core/services/calculadora.service';
import { ApoioComponent } from '../../shared/components/apoio/apoio.component';

import { EixosIlustracaoCompletaComponent } from '../../shared/components/eixos-ilustracao-completa/eixos-ilustracao-completa.component';
import { EixosIlustracaoMobileComponent } from '../../shared/components/eixos-ilustracao-mobile/eixos-ilustracao-mobile.component';
import { ParceirosComponent } from '../../shared/components/parceiros/parceiros.component';
import { RealizacaoComponent } from '../../shared/components/realizacao/realizacao.component';

import { MetaTagService } from '../../core/services/meta-tag.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HttpClientModule,
    RealizacaoComponent,
    ApoioComponent,
    ParceirosComponent,
    EixosIlustracaoCompletaComponent,
    NgbTooltipModule,
    RouterLink,
    TranslateModule,
    EixosIlustracaoMobileComponent,
  ],
  providers: [CalculadoraService],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  constructor(private metaTagService: MetaTagService) {}

  ngOnInit(): void {

    this.metaTagService.updateMetaTags({
      title_key: 'home.metatags.title',
      description_key: 'home.metatags.description',
    });

  }
}
