import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthService } from './auth/auth.service';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { SharedModule } from '../shared/shared.module';
import { SecurityRoutingModule } from './security.routing.module';
import { ForbiddenComponent } from './roles/forbidden/forbidden.component';
import { NotFoundComponent } from './http/not-found/not-found.component';
import { RolesService } from './roles/roles.service';
import { HttpErrorHandler } from './http/http-error.handler';
import { AuthInterceptor } from './auth/auth.interceptor';

@NgModule({
  imports: [
    CommonModule,
    NgZorroAntdModule,
    SharedModule,
    SecurityRoutingModule
  ],
  declarations: [
    LoginComponent,
    ForbiddenComponent,
    NotFoundComponent
  ],
  providers: [
    AuthService,
    RolesService, 
    HttpErrorHandler,   
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    } 

  ]
})
export class SecurityModule { }
