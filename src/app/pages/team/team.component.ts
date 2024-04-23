import { Component } from '@angular/core';
import { HeaderComponent } from '../../core/layout/header/header.component';
import { PartnersComponent } from '../../shared/components/partners/partners.component';

@Component({
  selector: 'app-team',
  standalone: true,
  imports: [HeaderComponent, PartnersComponent],
  templateUrl: './team.component.html',
  styleUrl: './team.component.scss'
})
export class TeamComponent {

}
