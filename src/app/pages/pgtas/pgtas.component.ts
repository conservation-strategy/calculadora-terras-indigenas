import { Component, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { MetaTagService } from '../../core/services/meta-tag.service';

@Component({
  selector: 'app-pgtas',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './pgtas.component.html',
  styleUrl: './pgtas.component.scss',
})
export class PgtasComponent implements OnInit {
  constructor(private metaTagService: MetaTagService) {}

  ngOnInit(): void {

    this.metaTagService.updateMetaTags({
      title_key: 'pgtas.metatags.title',
      description_key: 'pgtas.metatags.description',
      filename: 'Principal_Fundo1.png'
    });

  }
}
