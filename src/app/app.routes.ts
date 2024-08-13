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
    path: 'calculadora_comparativa',
    // loadComponent: () =>
    //   import(
    //     './pages/calculadora-comparativa/calculadora-comparativa.component'
    //   ).then((c) => c.CalculadoraComparativaComponent),
    loadComponent: () =>
      import('./pages/home/home.component').then((c) => c.HomeComponent),
  },
  {
    path: 'calculadora_terra_indigena',
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
    path: 'pgtas',
    loadComponent: () =>
      import('./pages/pgtas/pgtas.component').then((c) => c.PgtasComponent),
  },
  {
    path: 'equipe',
    loadComponent: () =>
      import('./pages/equipe/equipe.component').then((c) => c.EquipeComponent),
  },
  {
    path: 'links_uteis',
    loadComponent: () =>
      import('./pages/links-uteis/links-uteis.component').then(
        (c) => c.LinksUteisComponent
      ),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
