import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-calculadora-lista',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './calculadora-lista.component.html',
  styleUrl: './calculadora-lista.component.scss',
})
export class CalculadoraListaComponent {}
