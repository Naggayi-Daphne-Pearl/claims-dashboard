import { Routes } from '@angular/router';
import { Claims } from './claims/claims';

export const routes: Routes = [
  { path: 'claims', component: Claims },
  { path: '', pathMatch: 'full', redirectTo: 'claims' },
  {path:'claims:/id'}
];
