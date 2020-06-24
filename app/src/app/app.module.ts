import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { registerLocaleData } from '@angular/common';
import pt from '@angular/common/locales/pt';

import { AppComponent } from './app.component';
import { NZ_I18N, pt_BR } from 'ng-zorro-antd';
import { AppRoutingModule } from './app.routing.module';
import { LayoutComponent } from './layout/layout.component';
import { SecurityModule } from './security/security.module';
import { SharedModule } from './shared/shared.module';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { AdminSettingsModule } from './admin-settings/admin-settings.module';
import { HomeComponent } from './home/home.component';
import { NgHttpLoaderModule } from 'ng-http-loader';
import { PagesModule } from './pages/pages.module';

import { IconDefinition } from '@ant-design/icons-angular';
import { NgZorroAntdModule, NZ_ICON_DEFAULT_TWOTONE_COLOR, NZ_ICONS } from 'ng-zorro-antd';
import { EditOutline, ProfileOutline, SettingOutline, HomeOutline, UserOutline, LogoutOutline, UpOutline, DeleteOutline, MenuFoldOutline, MenuUnfoldOutline, SearchOutline, BellFill, ProjectFill } from '@ant-design/icons-angular/icons';

const icons: IconDefinition[] = [ EditOutline, ProfileOutline, SettingOutline, HomeOutline, UserOutline, LogoutOutline, UpOutline, DeleteOutline, MenuFoldOutline, MenuUnfoldOutline, SearchOutline, BellFill, ProjectFill ];

registerLocaleData(pt);

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    RouterModule,
    AppRoutingModule,
    SecurityModule,
    SharedModule,
    AdminSettingsModule,
    PagesModule,
    NgHttpLoaderModule,
    NgZorroAntdModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    {
      provide: NZ_I18N,
      useValue: pt_BR
    },
    { provide: NZ_ICON_DEFAULT_TWOTONE_COLOR, useValue: '#00ff00' }, // If not provided, Ant Design's official blue would be used
    { provide: NZ_ICONS, useValue: icons }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
