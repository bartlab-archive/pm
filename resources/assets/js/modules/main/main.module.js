import 'angular';
import mainConfig from './main.config';
import joinFilter from './filters/join.filter';
import nl2pFilter from './filters/nl2p.filter';
import wordsFilter from './filters/words.filter';
import lettersFilter from './filters/letters.filter';
import bytesToSizeUnitsFilter from './filters/bytesToSizeUnits.filter';
import rangeFilter from './filters/range.filter';
import DemoDirective from './directives/demo/demo.directive';
import mainIndexComponent from './components/index/main-index.component';
import mainLoginComponent from './components/login/main-login.component';
import mainRegistrationComponent from './components/registration/main-registration.component';
import mainLogoutComponent from './components/logout/main-logout.component';
import mainResetPasswordComponent from './components/reset-password/main-reset-password.component';
import main404Component from './components/404/main-404.component';
import main500Component from './components/500/main-500.component';

angular.module('app.modules.main', [])
    .config(mainConfig.inst())
    .filter('nl2p', nl2pFilter)
    .filter('words', wordsFilter)
    .filter('letters', lettersFilter)
    .filter('join', joinFilter)
    .filter('bytesToSizeUnitsFilter', bytesToSizeUnitsFilter)
    .filter('range', rangeFilter)
    .directive(DemoDirective.selector, DemoDirective.inst())
    .component(mainIndexComponent.name, mainIndexComponent)
    .component(mainLoginComponent.name, mainLoginComponent)
    .component(mainRegistrationComponent.name, mainRegistrationComponent)
    .component(mainLogoutComponent.name, mainLogoutComponent)
    .component(mainResetPasswordComponent.name, mainResetPasswordComponent)
    .component(main500Component.name, main500Component)
    .component(main404Component.name, main404Component);
