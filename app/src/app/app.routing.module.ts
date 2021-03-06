import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { AuthGuard } from './security/auth/auth.guard';
import { AdminSettingsModule } from './admin-settings/admin-settings.module';
import { SecurityModule } from './security/security.module';
import { HomeComponent } from './home/home.component';
import { RolesGuard } from './security/roles/roles.guard';
import { PagesModule } from './pages/pages.module';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent,
        canActivate: [AuthGuard, RolesGuard]
      },
      {
        path: 'admin-settings',
        // loadChildren: './admin-settings/admin-settings.module#AdminSettingsModule',
        loadChildren: () => AdminSettingsModule,
        canActivate: [AuthGuard]
      },
      {
        path: 'pages',
        // loadChildren: './pages/pages.module#PagesModule',
        loadChildren: () => PagesModule,
        canActivate: [AuthGuard]
      }
    ]
  },
  {
    path: '',
    // loadChildren: './security/security.module#SecurityModule'
    loadChildren: () => SecurityModule
  },
  {
    path: '**',
    redirectTo: '/not-found',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
