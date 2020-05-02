import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RolesGuard } from '../security/roles/roles.guard';
import { AuthGuard } from '../security/auth/auth.guard';
import { InstitutionListComponent } from './institution/institution-list/institution-list.component';
import { InstitutionComponent } from './institution/institution.component';

const routes: Routes = [
  {
    path: 'institutions',
    children: [
      {
        path: 'list',
        component: InstitutionListComponent,
        canActivate: [RolesGuard, AuthGuard]
      },
      {
        path: '',
        component: InstitutionComponent,
        canActivate: [RolesGuard, AuthGuard],
      },
      {
        path: ':id',
        component: InstitutionComponent,
        canActivate: [RolesGuard, AuthGuard]
      }
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: []
})
export class PagesRoutingModule { }
