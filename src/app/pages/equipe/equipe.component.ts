import { Component, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ApoioComponent } from '../../shared/components/apoio/apoio.component';
import { ParceirosComponent } from '../../shared/components/parceiros/parceiros.component';
import { RealizacaoComponent } from '../../shared/components/realizacao/realizacao.component';

import { MetaTagService } from '../../core/services/meta-tag.service';

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
export class EquipeComponent implements OnInit {
  constructor(private metaTagService: MetaTagService) {}

  ngOnInit(): void {

    this.metaTagService.updateMetaTags({
      title_key: 'team.metatags.title',
      description_key: 'team.metatags.description',
      filename: 'Mono_FundoBranco.png'
    });

  }
}

