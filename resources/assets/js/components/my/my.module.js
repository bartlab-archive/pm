import 'angular';

import MyConfig from './my.config';
import myAccountComponent from './account/my-account.component';
import myPasswordComponent from './password/my-password.component';

angular.module('app.components.my', [])
  .config(MyConfig.inst())
  .component(myAccountComponent.name, myAccountComponent)
  .component(myPasswordComponent.name, myPasswordComponent);