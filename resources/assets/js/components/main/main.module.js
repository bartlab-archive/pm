import 'angular';

import MainConfig from './main.config';
import mainIndexComponent from './index/main-index.component';
import mainLoginComponent from './login/main-login.component';
import mainRegistrationComponent from './registration/main-registration.component';
import mainLogoutComponent from './logout/main-logout.component';

angular.module('app.components.main', [])
    .config(MainConfig)
    .component('mainIndexComponent', mainIndexComponent)
    .component('mainLoginComponent', mainLoginComponent)
    .component('mainRegistrationComponent', mainRegistrationComponent)
    .component('mainLogoutComponent', mainLogoutComponent);