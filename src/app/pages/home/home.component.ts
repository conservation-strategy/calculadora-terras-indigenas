import { Component } from '@angular/core';
import { PartnersComponent } from '../../shared/components/partners/partners.component';
import { CalculatorListComponent } from '../../shared/components/calculator-list/calculator-list.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [PartnersComponent, CalculatorListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
