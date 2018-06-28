import 'angular';
import MyConfig from './my.config';
import MyService from './services/my.service';
import MyAccountComponent from './components/account/my-account.component';
import MyPageComponent from './components/page/my-page.component';
import MyChangePasswordComponent from './components/change-password/my-change-password.component';

angular.module('app.modules.my', [])
    .config(MyConfig.inst())
    .service(MyService.getName(), MyService)
    .component(MyChangePasswordComponent.getName(), MyChangePasswordComponent)
    .component(MyAccountComponent.getName(), MyAccountComponent)
    .component(MyPageComponent.getName(), MyPageComponent);