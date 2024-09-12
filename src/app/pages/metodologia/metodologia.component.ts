import { Component, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { MetaTagService } from '../../core/services/meta-tag.service';

@Component({
  selector: 'app-metodologia',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './metodologia.component.html',
  styleUrl: './metodologia.component.scss',
})
export class MetodologiaComponent implements OnInit {
  constructor(private metaTagService: MetaTagService) {}

  ngOnInit(): void {

    this.metaTagService.updateMetaTags({
      title_key: 'methodology.metatags.title',
      description_key: 'methodology.metatags.description',
      filename: 'Principal_Fundo1.png'
    });

  }
}
