import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StorageService } from './storage/storage.service';
import { FormService } from './form/form.service';
import { TranslateModule } from '@ngx-translate/core';
import { NgZorroAntdModule, NZ_MESSAGE_CONFIG } from 'ng-zorro-antd';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    TranslateModule,
    NgZorroAntdModule
  ],
  providers: [
    StorageService,
    FormService,
    {
      provide: NZ_MESSAGE_CONFIG, useValue: { nzDuration: 5000 }
    }
  ],
  declarations: []
})
export class SharedModule { }
