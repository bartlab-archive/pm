import 'angular';
import MyConfig from './my.config';
import myAccountComponent from './components/account/my-account.component';
import myMailsComponent from './components/mails/my-mails.component';
import myChangePasswordComponent from './components/change-password/my-change-password.component';
import myPageComponent from './components/page/my-page.component';

angular.module('app.modules.my', [])
    .config(MyConfig.inst())
    .component(myAccountComponent.name, myAccountComponent)
    .component(myMailsComponent.name, myMailsComponent)
    .component(myChangePasswordComponent.name, myChangePasswordComponent)
    .component(myPageComponent.name, myPageComponent);