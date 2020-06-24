import { NgModule } from '@angular/core';
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
import { UserInformationsComponent } from '../user-informations/user-informations.component';

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
    MySocialProjectsComponent,
    SocialProjectSearchComponent,
    UserInformationsComponent
  ]
})
export class PagesModule { }
