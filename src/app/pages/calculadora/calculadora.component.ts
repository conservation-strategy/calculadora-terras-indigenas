import { Component } from '@angular/core';
import { HeaderComponent } from '../../core/layout/header/header.component';
import { CalculadoraListaComponent } from '../../shared/components/calculadora-lista/calculadora-lista.component';

@Component({
  selector: 'app-calculadora',
  standalone: true,
  imports: [HeaderComponent, CalculadoraListaComponent],
  templateUrl: './calculadora.component.html',
  styleUrl: './calculadora.component.scss',
})
export class CalculadoraComponent {}
