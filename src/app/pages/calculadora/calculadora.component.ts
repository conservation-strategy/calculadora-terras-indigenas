import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HeaderComponent } from '../../core/layout/header/header.component';

@Component({
  selector: 'app-calculadora',
  standalone: true,
  imports: [HeaderComponent, RouterLink],
  templateUrl: './calculadora.component.html',
  styleUrl: './calculadora.component.scss',
})
export class CalculadoraComponent {}
