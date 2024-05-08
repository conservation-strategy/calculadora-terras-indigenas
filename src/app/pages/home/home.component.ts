import { Component } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CalculadoraListaComponent } from '../../shared/components/calculadora-lista/calculadora-lista.component';
import { RealizacaoComponent } from '../../shared/components/realizacao/realizacao.component';
import { ApoioComponent } from '../../shared/components/apoio/apoio.component';
import { ParceirosComponent } from '../../shared/components/parceiros/parceiros.component';
import { CalculadoraService } from '../../core/services/calculadora.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HttpClientModule,
    CalculadoraListaComponent,
    RealizacaoComponent,
    ApoioComponent,
    ParceirosComponent,
  ],
  providers: [CalculadoraService],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  youtubeVideoUrl: any;
  constructor(
    private calculatorService: CalculadoraService,
    private sanitizer: DomSanitizer
  ) {
    this.calculatorService.obterSiteConfig().subscribe((response) => {
      this.youtubeVideoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
        response.youtubeVideoUrl
      );
    });
  }
}
