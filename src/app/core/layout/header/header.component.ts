import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, TranslateModule],
  providers: [TranslateService],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  selectedLanguage: string;
  constructor(private translateService: TranslateService) {
    const language = window.sessionStorage.getItem('selectedLanguage');
    this.selectedLanguage = language ? language : '';
    this.changeLanguageSelection(this.selectedLanguage);
  }

  languageSelection(evt: any) {
    this.selectedLanguage = evt.target.value;
    this.changeLanguageSelection(this.selectedLanguage);
  }

  changeLanguageSelection(language: string) {
    if (['pt', 'es', 'en'].includes(language)) {
      window.sessionStorage.setItem('selectedLanguage', language);
      this.translateService.use(language);
      this.selectedLanguage = language;
    } else {
      window.sessionStorage.setItem('selectedLanguage', 'pt');
      this.translateService.use('pt');
      this.selectedLanguage = language;
    }
  }
}
