import { Component } from '@angular/core';
import { HeaderComponent } from '../../core/layout/header/header.component';

@Component({
  selector: 'app-sobre',
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: './sobre.component.html',
  styleUrl: './sobre.component.scss'
})
export class SobreComponent {

}
