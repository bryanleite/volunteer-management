import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfilesComponent } from './profiles/profiles.component';
import { UsersComponent } from './users/users.component';
import { RolesGuard } from '../security/roles/roles.guard';
import { AuthGuard } from '../security/auth/auth.guard';
import { ProfileDetailComponent } from './profiles/profile-detail/profile-detail.component';
import { UserDetailComponent } from './users/user-detail/user-detail.component';

const routes: Routes = [
  {
    path: 'profiles',
    children: [
      {
        path: 'list',
        component: ProfilesComponent,
        canActivate: [RolesGuard, AuthGuard]
      },
      {
        path: '',
        component: ProfileDetailComponent,
        canActivate: [RolesGuard, AuthGuard],
      },
      {
        path: ':profileId',
        component: ProfileDetailComponent,
        canActivate: [RolesGuard, AuthGuard]
      }
    ]
  },
  {
    path: 'users',
    children: [
      {
        path: 'list',
        component: UsersComponent,
        canActivate: [RolesGuard, AuthGuard]
      },
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full'
      },
      {
        path: ':userId',
        component: UserDetailComponent,
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
export class AdminSettingsRoutingModule { }
