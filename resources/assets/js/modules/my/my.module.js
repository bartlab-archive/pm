import 'angular';
import MyConfig from './my.config';
// import MyService from './services/my.service';
import MyProvider from './providers/my.provider';
import MyAccountComponent from './components/account/my-account.component';
import MyPageComponent from './components/page/my-page.component';
import MyChangePasswordComponent from './components/change-password/my-change-password.component';
import MyEmailsComponent from "./components/emails/my-emails.component";

angular.module('app.modules.my', [])
    .config(MyConfig.inst())
    .provider(MyProvider.getName(), MyProvider)
    // .service(MyService.getName(), MyService)
    .component(MyChangePasswordComponent.getName(), MyChangePasswordComponent)
    .component(MyAccountComponent.getName(), MyAccountComponent)
    .component(MyPageComponent.getName(), MyPageComponent)
    .component(MyEmailsComponent.getName(), MyEmailsComponent);