import { Routes } from '@angular/router';
import { Login } from './login/login';
import { MainLayout } from './main-layout/main-layout';

export const routes: Routes = [
  {
    path: 'login',
    component: Login
  },
  {
    path: '',
    component: MainLayout, // Esse componente tem o menu
    children: [
      {
        path: 'tasks',
        loadComponent: () => import('./pages/tasks/tasks').then(m => m.Tasks)
      },
      {
        path: '',
        redirectTo: 'tasks',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];
