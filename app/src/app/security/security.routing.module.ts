import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ForbiddenComponent } from './roles/forbidden/forbidden.component';
import { NotFoundComponent } from './http/not-found/not-found.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  }, 
  {
    path: 'forbidden',
    component: ForbiddenComponent
  },
  {
    path: 'not-found',
    component: NotFoundComponent
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: []
})
export class SecurityRoutingModule { }
