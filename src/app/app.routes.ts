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
      import('./pages/calculadora/calculadora.component').then(
        (c) => c.CalculadoraComponent
      ),
  },
  {
    path: 'calculadora-agrupada',
    loadComponent: () =>
      import(
        './pages/calculadora-agrupada/calculadora-agrupada.component'
      ).then((c) => c.CalculadoraAgrupadaComponent),
  },
  {
    path: 'calculadora-terra-indigena',
    loadComponent: () =>
      import(
        './pages/calculadora-terra-indigena/calculadora-terra-indigena.component'
      ).then((c) => c.CalculadoraTerraIndigenaComponent),
  },
  {
    path: 'metodologia',
    loadComponent: () =>
      import('./pages/metodologia/metodologia.component').then(
        (c) => c.MetodologiaComponent
      ),
  },
  {
    path: 'publicacoes',
    loadComponent: () =>
      import('./pages/publicacoes/publicacoes.component').then(
        (c) => c.PublicacoesComponent
      ),
  },
  {
    path: 'equipe',
    loadComponent: () =>
      import('./pages/time/time.component').then((c) => c.TimeComponent),
  },
  {
    path: 'contato',
    loadComponent: () =>
      import('./pages/contato/contato.component').then(
        (c) => c.ContatoComponent
      ),
  },
  {
    path: 'sobre',
    loadComponent: () =>
      import('./pages/sobre/sobre.component').then((c) => c.SobreComponent),
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
