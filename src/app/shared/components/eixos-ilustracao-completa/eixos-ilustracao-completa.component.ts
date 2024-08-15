import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { EixosIlustracaoCompletaEnComponent } from '../eixos-ilustracao-completa-en/eixos-ilustracao-completa-en.component';
import { EixosIlustracaoCompletaEsComponent } from '../eixos-ilustracao-completa-es/eixos-ilustracao-completa-es.component';
import { EixosIlustracaoCompletaPtComponent } from '../eixos-ilustracao-completa-pt/eixos-ilustracao-completa-pt.component';

@Component({
  selector: 'app-eixos-ilustracao-completa',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    EixosIlustracaoCompletaPtComponent,
    EixosIlustracaoCompletaEsComponent,
    EixosIlustracaoCompletaEnComponent,
  ],
  providers: [TranslateService],
  templateUrl: './eixos-ilustracao-completa.component.html',
  styleUrl: './eixos-ilustracao-completa.component.scss',
})
export class EixosIlustracaoCompletaComponent implements OnInit {
  selectedLanguage: string = '';

  constructor(private translateService: TranslateService) {}

  ngOnInit(): void {
    this.selectedLanguage = this.translateService.currentLang;
    this.translateService.onLangChange.subscribe((x) => {
      console.log(x);
      this.selectedLanguage = x.lang;
    });
  }
}
