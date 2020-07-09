import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { UserInformationsComponent } from './user-informations.component';
import { CommonModule } from '@angular/common';
import { NgZorroAntdModule, NZ_MESSAGE_CONFIG } from 'ng-zorro-antd';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    imports: [
        CommonModule,
        NgZorroAntdModule,
        SharedModule
      ],
      exports: [
        UserInformationsComponent
      ],
      declarations: [
          UserInformationsComponent
      ],
      providers: [
        {
          provide: NZ_MESSAGE_CONFIG, useValue: { nzDuration: 5000 }
        }
      ]
})
export class UserInformationsModule { }
