import { Component } from '@angular/core';
import { HeaderComponent } from '../../core/layout/header/header.component';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {

}
