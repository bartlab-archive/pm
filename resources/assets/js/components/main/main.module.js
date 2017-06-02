import 'angular';

import MainConfig from './main.config';
import mainIndexComponent from './index/main-index.component';
import mainLoginComponent from './login/main-login.component';
import mainRegistrationComponent from './registration/main-registration.component';
import mainLogoutComponent from './logout/main-logout.component';
import mainResetComponent from './reset/main-reset.component';
import main404Component from './404/main-404.component';
import main500Component from './500/main-500.component';
import myAccountComponent from './myaccount/my-account.component';

angular.module('app.components.main', [])
    .config(MainConfig)
    .component('mainIndexComponent', mainIndexComponent)
    .component('mainLoginComponent', mainLoginComponent)
    .component('mainRegistrationComponent', mainRegistrationComponent)
    .component('mainLogoutComponent', mainLogoutComponent)
    .component('mainResetComponent', mainResetComponent)
    .component('main500Component', main500Component)
    .component('main404Component', main404Component)
    .component('myAccountComponent', myAccountComponent);