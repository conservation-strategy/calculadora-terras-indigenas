import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { EixosMobile1EnComponent } from '../eixos-mobile1-en/eixos-mobile1-en.component';
import { EixosMobile1EsComponent } from '../eixos-mobile1-es/eixos-mobile1-es.component';
import { EixosMobile1PtComponent } from '../eixos-mobile1-pt/eixos-mobile1-pt.component';
import { EixosMobile2EnComponent } from '../eixos-mobile2-en/eixos-mobile2-en.component';
import { EixosMobile2EsComponent } from '../eixos-mobile2-es/eixos-mobile2-es.component';
import { EixosMobile2PtComponent } from '../eixos-mobile2-pt/eixos-mobile2-pt.component';
import { EixosMobile3EnComponent } from '../eixos-mobile3-en/eixos-mobile3-en.component';
import { EixosMobile3EsComponent } from '../eixos-mobile3-es/eixos-mobile3-es.component';
import { EixosMobile3PtComponent } from '../eixos-mobile3-pt/eixos-mobile3-pt.component';
import { EixosMobile4EnComponent } from '../eixos-mobile4-en/eixos-mobile4-en.component';
import { EixosMobile4EsComponent } from '../eixos-mobile4-es/eixos-mobile4-es.component';
import { EixosMobile4PtComponent } from '../eixos-mobile4-pt/eixos-mobile4-pt.component';

@Component({
  selector: 'app-eixos-ilustracao-mobile',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    EixosMobile1PtComponent,
    EixosMobile2PtComponent,
    EixosMobile3PtComponent,
    EixosMobile4PtComponent,

    EixosMobile1EsComponent,
    EixosMobile2EsComponent,
    EixosMobile3EsComponent,
    EixosMobile4EsComponent,

    EixosMobile1EnComponent,
    EixosMobile2EnComponent,
    EixosMobile3EnComponent,
    EixosMobile4EnComponent,
  ],
  providers: [TranslateService],
  templateUrl: './eixos-ilustracao-mobile.component.html',
  styleUrl: './eixos-ilustracao-mobile.component.scss',
})
export class EixosIlustracaoMobileComponent implements OnInit {
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
