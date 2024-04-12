import { Component } from '@angular/core';
import { HeaderComponent } from '../../core/layout/header/header.component';
import { CalculatorListComponent } from '../../shared/calculator-list/calculator-list.component';

@Component({
  selector: 'app-calculator',
  standalone: true,
  imports: [HeaderComponent, CalculatorListComponent],
  templateUrl: './calculator.component.html',
  styleUrl: './calculator.component.scss'
})
export class CalculatorComponent {

}
