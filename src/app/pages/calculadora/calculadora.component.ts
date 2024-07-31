import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PageTitleComponent } from '../../core/layout/page-title/page-title.component';

@Component({
  selector: 'app-calculadora',
  standalone: true,
  imports: [PageTitleComponent, RouterLink],
  templateUrl: './calculadora.component.html',
  styleUrl: './calculadora.component.scss',
})
export class CalculadoraComponent {}
