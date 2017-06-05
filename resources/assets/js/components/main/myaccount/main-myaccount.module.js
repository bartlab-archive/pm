import 'angular';

import MainMyAccountConfig from './main-myaccount.config';
import mainMyAccountIndexComponent from './index/main-myaccount-index.component';
import mainMyAccountChangePasswordComponent from './change-password/main-myaccount-change-password.component';

angular.module('app.components.main.myaccount', [])
  .config(MainMyAccountConfig)
  .component('mainMyAccountIndexComponent', mainMyAccountIndexComponent)
  .component('mainMyAccountChangePasswordComponent', mainMyAccountChangePasswordComponent);