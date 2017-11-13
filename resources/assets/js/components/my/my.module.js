import 'angular';

import MyConfig from './my.config';
import myAccountComponent from './account/my-account.component';
import myMailsComponent from './mails/my-mails.component';
import myChangePasswordComponent from './change-password/my-change-password.component';
import myPageComponent from './page/my-page.component';

angular.module('app.components.my', [])
    .config(MyConfig.inst())
    .component(myAccountComponent.name, myAccountComponent)
    .component(myMailsComponent.name, myMailsComponent)
    .component(myChangePasswordComponent.name, myChangePasswordComponent)
    .component(myPageComponent.name, myPageComponent);