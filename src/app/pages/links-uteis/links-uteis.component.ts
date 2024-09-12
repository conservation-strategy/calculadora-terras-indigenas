import { Component, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import { MetaTagService } from '../../core/services/meta-tag.service';

@Component({
  selector: 'app-links-uteis',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './links-uteis.component.html',
  styleUrl: './links-uteis.component.scss',
})
export class LinksUteisComponent implements OnInit {
  constructor(private metaTagService: MetaTagService) {}

  ngOnInit(): void {

    this.metaTagService.updateMetaTags({
      title_key: 'useful-links.metatags.title',
      description_key: 'useful-links.metatags.description',
      filename: 'Principal_Fundo3.png'
    });

  }
}