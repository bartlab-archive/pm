import 'angular';

import MainConfig from './main.config';
import mainIndexComponent from './index/main-index.component';
import mainLoginComponent from './login/main-login.component';
import mainRegistrationCompoent from './registration/main-registration.component';

angular.module('app.components.main', [])
    .config(MainConfig)
    .component('mainIndex', mainIndexComponent)
    .component('mainLogin', mainLoginComponent)
    .component('mainRegistration', mainRegistrationCompoent);