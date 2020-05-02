import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfilesComponent } from './profiles/profiles.component';
import { UsersComponent } from './users/users.component';
import { AdminSettingsRoutingModule } from './admin-settings.routing.module';
import { SharedModule } from '../shared/shared.module';
import { SecurityModule } from '../security/security.module';
import { ProfileDetailComponent } from './profiles/profile-detail/profile-detail.component';
import { UserDetailComponent } from './users/user-detail/user-detail.component';
import { GroupByPipe } from '../shared/pipes/group-by.pipe';
import { ProfilesService } from './profiles/profiles.service';
import { UsersService } from './users/users.service';

@NgModule({
  imports: [
    CommonModule,
    AdminSettingsRoutingModule,
    SharedModule,
    SecurityModule
  ],
  declarations: [
    ProfilesComponent,
    UsersComponent,
    ProfileDetailComponent,
    UserDetailComponent,
    GroupByPipe
  ],
  providers: [
    ProfilesService,
    UsersService
  ]
})
export class AdminSettingsModule { }
