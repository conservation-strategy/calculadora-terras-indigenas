import { Component } from '@angular/core';
import { HeaderComponent } from '../../core/layout/header/header.component';

@Component({
  selector: 'app-calculator-basic',
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: './calculator-basic.component.html',
  styleUrl: './calculator-basic.component.scss'
})
export class CalculatorBasicComponent {

}
