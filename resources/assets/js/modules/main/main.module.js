import 'angular';
import MainConfig from './main.config';
import JoinFilter from './filters/join.filter';
import Nl2pFilter from './filters/nl2p.filter';
import WordsFilter from './filters/words.filter';
import LettersFilter from './filters/letters.filter';
import BytesToSizeUnitsFilter from './filters/bytesToSizeUnits.filter';
import RangeFilter from './filters/range.filter';
import DemoDirective from './directives/demo/demo.directive';
import CompileDirective from './directives/compile/compile.directive';
import MainIndexComponent from './components/index/main-index.component';
import MainLoginComponent from './components/login/main-login.component';
import MainRegistrationComponent from './components/registration/main-registration.component';
import MainLogoutComponent from './components/logout/main-logout.component';
import MainResetPasswordComponent from './components/reset-password/main-reset-password.component';
import Main404Component from './components/404/main-404.component';
import Main500Component from './components/500/main-500.component';
import MainProvider from "./providers/main.provider";

angular.module('app.modules.main', [])
    .config(MainConfig.inst())
    .filter(Nl2pFilter.getName(), Nl2pFilter.inst())
    .filter(WordsFilter.getName(), WordsFilter.inst())
    .filter(LettersFilter.getName(), LettersFilter.inst())
    .filter(JoinFilter.getName(), JoinFilter.inst())
    .filter(BytesToSizeUnitsFilter.getName(), BytesToSizeUnitsFilter.inst())
    .filter(RangeFilter.getName(), RangeFilter.inst())
    .directive(DemoDirective.getName(), DemoDirective.inst())
    .directive(CompileDirective.getName(), CompileDirective.inst())
    .provider(MainProvider.getName(), MainProvider)
    .component(MainIndexComponent.getName(), MainIndexComponent)
    .component(MainLoginComponent.getName(), MainLoginComponent)
    .component(MainRegistrationComponent.getName(), MainRegistrationComponent)
    .component(MainLogoutComponent.getName(), MainLogoutComponent)
    .component(MainResetPasswordComponent.getName(), MainResetPasswordComponent)
    .component(Main500Component.getName(), Main500Component)
    .component(Main404Component.getName(), Main404Component);



