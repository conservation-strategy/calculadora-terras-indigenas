import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./pages/home/home.component').then((c) => c.HomeComponent),
  },
  {
    path: 'calculadora',
    loadComponent: () =>
      import('./pages/calculator/calculator.component').then(
        (c) => c.CalculatorComponent
      ),
  },
  {
    path: 'calculadora-basica',
    loadComponent: () =>
      import('./pages/calculator-basic/calculator-basic.component').then(
        (c) => c.CalculatorBasicComponent
      ),
  },
  {
    path: 'calculadora-agrupada',
    loadComponent: () =>
      import('./pages/calculator-grouped/calculator-grouped.component').then(
        (c) => c.CalculatorGroupedComponent
      ),
  },
  {
    path: 'calculadora-detalhada',
    loadComponent: () =>
      import('./pages/calculator-detailed/calculator-detailed.component').then(
        (c) => c.CalculatorDetailedComponent
      ),
  },
  {
    path: 'metodologia',
    loadComponent: () =>
      import('./pages/metodology/metodology.component').then(
        (c) => c.MetodologyComponent
      ),
  },
  {
    path: 'publicacoes',
    loadComponent: () =>
      import('./pages/publications/publications.component').then(
        (c) => c.PublicationsComponent
      ),
  },
  {
    path: 'equipe',
    loadComponent: () =>
      import('./pages/team/team.component').then((c) => c.TeamComponent),
  },
  {
    path: 'contato',
    loadComponent: () =>
      import('./pages/contact/contact.component').then(
        (c) => c.ContactComponent
      ),
  },
  {
    path: 'sobre',
    loadComponent: () =>
      import('./pages/about/about.component').then((c) => c.AboutComponent),
  },
  {
    path: 'not-found',
    loadComponent: () =>
      import('./pages/not-found/not-found.component').then(
        (c) => c.NotFoundComponent
      ),
  },
  {
    path: '**',
    redirectTo: 'not-found',
  },
];
