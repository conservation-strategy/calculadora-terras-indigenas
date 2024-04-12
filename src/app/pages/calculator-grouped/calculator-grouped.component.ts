import { Component } from '@angular/core';
import { HeaderComponent } from '../../core/layout/header/header.component';

@Component({
  selector: 'app-calculator-grouped',
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: './calculator-grouped.component.html',
  styleUrl: './calculator-grouped.component.scss',
})
export class CalculatorGroupedComponent {}
