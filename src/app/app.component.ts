import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TopComponent } from './core/layout/top/top.component';
import { FooterComponent } from './core/layout/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TopComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'calc-gestao-terras-indigenas';
}
