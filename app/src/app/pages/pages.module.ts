import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InstitutionComponent } from './institution/institution.component';
import { InstitutionListComponent } from './institution/institution-list/institution-list.component';
import { SecurityModule } from '../security/security.module';
import { PagesRoutingModule } from './pages.routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SecurityModule,
    SharedModule,
    PagesRoutingModule
  ],
  declarations: [
    InstitutionComponent,
    InstitutionListComponent
  ]
})
export class PagesModule { }
