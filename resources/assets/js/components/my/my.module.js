import 'angular';

import myConfig from './my.config';
import myAccountComponent from './account/my-account.component';
import myPasswordComponent from './password/my-password.component';
import LanguageService from 'services/language.service';
import GetUserInfoService from 'services/get-user-info.service';

angular.module('app.components.my', [])
  .config(myConfig)
  .service('LanguageService', LanguageService)
  .service('GetUserInfoService', GetUserInfoService)
  .component(myAccountComponent.name, myAccountComponent)
  .component(myPasswordComponent.name, myPasswordComponent);