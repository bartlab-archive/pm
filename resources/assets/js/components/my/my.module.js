import 'angular';

import MyConfig from './my.config';
import myAccountComponent from './account/my-account.component';
import myChangePasswordComponent from './change-password/my-change-password.component';
import LanguageService from 'services/language.service';
import GetUserInfoService from 'services/get-user-info.service';

angular.module('app.components.my', [])
  .config(MyConfig)
  .service('LanguageService', LanguageService)
  .service('GetUserInfoService', GetUserInfoService)
  .component('myAccountComponent', myAccountComponent)
  .component('myChangePasswordComponent', myChangePasswordComponent);