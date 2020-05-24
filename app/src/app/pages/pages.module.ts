import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InstitutionComponent } from './institution/institution.component';
import { InstitutionListComponent } from './institution/institution-list/institution-list.component';
import { SecurityModule } from '../security/security.module';
import { PagesRoutingModule } from './pages.routing.module';
import { SharedModule } from '../shared/shared.module';
import { VolunteerComponent } from './volunteer/volunteer.component';
import { SocialProjectComponent } from './social-project/social-project.component';
import { SocialProjectListComponent } from './social-project/social-project-list/social-project-list.component';

@NgModule({
  imports: [
    CommonModule,
    SecurityModule,
    SharedModule,
    PagesRoutingModule
  ],
  declarations: [
    InstitutionComponent,
    InstitutionListComponent,
    VolunteerComponent,
    SocialProjectComponent,
    SocialProjectListComponent
  ]
})
export class PagesModule { }
