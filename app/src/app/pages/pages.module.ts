import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InstitutionComponent } from './institution/institution.component';
import { InstitutionListComponent } from './institution/institution-list/institution-list.component';
import { SecurityModule } from '../security/security.module';
import { PagesRoutingModule } from './pages.routing.module';
import { SharedModule } from '../shared/shared.module';
import { VolunteerComponent } from './volunteer/volunteer.component';
import { SocialProjectComponent } from './social-project/social-project.component';
import { MySocialProjectsComponent } from './my-social-projects/my-social-projects.component';
import { SocialProjectSearchComponent } from './social-project-search/social-project-search.component';
import { UserInformationsModule } from '../user-informations/user-informations.module';

@NgModule({
  imports: [
    CommonModule,
    SecurityModule,
    SharedModule,
    UserInformationsModule,
    PagesRoutingModule
  ],
  declarations: [
    InstitutionComponent,
    InstitutionListComponent,
    VolunteerComponent,
    SocialProjectComponent,
    MySocialProjectsComponent,
    SocialProjectSearchComponent
  ]
})
export class PagesModule { }
