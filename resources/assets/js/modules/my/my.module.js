import 'angular';
import MyConfig from './my.config';
import MyAccountComponent from './components/account/my-account.component';
import MyMailsComponent from './components/mails/my-mails.component';
import MyChangePasswordComponent from './components/change-password/my-change-password.component';
import MyPageComponent from './components/page/my-page.component';

angular.module('app.modules.my', [])
    .config(MyConfig.inst())
    .component(MyAccountComponent.getName(), MyAccountComponent)
    .component(MyMailsComponent.getName(), MyMailsComponent)
    .component(MyChangePasswordComponent.getName(), MyChangePasswordComponent)
    .component(MyPageComponent.getName(), MyPageComponent);