import 'angular';

import myConfig from './my.config';
import myAccountComponent from './account/my-account.component';
import myPasswordComponent from './password/my-password.component';

angular.module('app.components.my', [])
  .config(myConfig)
  .component(myAccountComponent.name, myAccountComponent)
  .component(myPasswordComponent.name, myPasswordComponent);