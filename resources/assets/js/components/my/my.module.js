import 'angular';

import MyConfig from './my.config';
import myAccountComponent from './account/my-account.component';
import myPasswordComponent from './password/my-password.component';
import myShowApiKeyComponent from './show-api-key/my-show-api-key.component';
import myAddMailComponent from './add-mail/my-add-mail.component';
import myChangePasswordComponent from './change-password/my-change-password.component';

angular.module('app.components.my', [])
    .config(MyConfig.inst())
    .component(myAccountComponent.name, myAccountComponent)
    .component(myPasswordComponent.name, myPasswordComponent)
    .component(myShowApiKeyComponent.name, myShowApiKeyComponent)
    .component(myAddMailComponent.name, myAddMailComponent)
    .component(myChangePasswordComponent.name, myChangePasswordComponent);