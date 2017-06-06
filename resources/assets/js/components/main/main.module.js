import 'angular';

import mainConfig from './main.config';
import mainIndexComponent from './index/main-index.component';
import mainLoginComponent from './login/main-login.component';
import mainRegistrationComponent from './registration/main-registration.component';
import mainLogoutComponent from './logout/main-logout.component';
import mainResetComponent from './reset/main-reset.component';
import main404Component from './404/main-404.component';
import main500Component from './500/main-500.component';
import LanguageService from 'services/language.service';

angular.module('app.components.main', [])
    .config(mainConfig)
    .service('LanguageService', LanguageService)
    .component('mainIndexComponent', mainIndexComponent)
    .component('mainLoginComponent', mainLoginComponent)
    .component('mainRegistrationComponent', mainRegistrationComponent)
    .component('mainLogoutComponent', mainLogoutComponent)
    .component('mainResetComponent', mainResetComponent)
    .component('main500Component', main500Component)
    .component('main404Component', main404Component);