import { Routes } from '@angular/router';
import { Claims } from './claims/claims';
import { NewClaimsForm } from './claims/new-claims/new-claims';

export const routes: Routes = [
  { path: 'claims', component: Claims },
  { path: '', pathMatch: 'full', redirectTo: 'claims' },
  {path:'claims/new', component: NewClaimsForm}
];
