import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Spinkit } from 'ng-http-loader';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  public spinkit: any = Spinkit;
  public ignoreUrls: string[] = [];

  constructor(translate: TranslateService) {
    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang('pt-BR');

    // the lang to use, if the lang isn't available, it will use the current loader to get them
    translate.use('pt-BR');

  }
}
