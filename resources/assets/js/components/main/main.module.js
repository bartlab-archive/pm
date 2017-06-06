import 'angular';

import mainConfig from './main.config';
import mainIndexComponent from './index/main-index.component';
import mainLoginComponent from './login/main-login.component';
import mainRegistrationComponent from './registration/main-registration.component';
import mainLogoutComponent from './logout/main-logout.component';
import mainResetPasswordComponent from './reset-password/main-reset-password.component';
import main404Component from './404/main-404.component';
import main500Component from './500/main-500.component';

angular.module('app.components.main', [])
    .config(mainConfig)
    .component(mainIndexComponent.name, mainIndexComponent)
    .component(mainLoginComponent.name, mainLoginComponent)
    .component(mainRegistrationComponent.name, mainRegistrationComponent)
    .component(mainLogoutComponent.name, mainLogoutComponent)
    .component(mainResetPasswordComponent.name, mainResetPasswordComponent)
    .component(main500Component.name, main500Component)
    .component(main404Component.name, main404Component);
