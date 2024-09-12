import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MetaTagService } from '../../core/services/meta-tag.service';

@Component({
  selector: 'app-calculadora',
  standalone: true,
  imports: [RouterLink, TranslateModule],
  templateUrl: './calculadora.component.html',
  styleUrl: './calculadora.component.scss',
})
export class CalculadoraComponent implements OnInit {
  constructor(private metaTagService: MetaTagService) {}

  ngOnInit(): void {

    this.metaTagService.updateMetaTags({
      title_key: 'calculator.metatags.title',
      description_key: 'calculator.metatags.description',
      filename: 'Principal_Fundo2.png'
    });

  }
}
