import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-top',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './top.component.html',
  styleUrl: './top.component.scss',
})
export class TopComponent {}
