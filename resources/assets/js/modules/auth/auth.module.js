import 'angular';
import AuthConfig from './auth.config';
import AuthIndexComponent from './components/index/auth-index.component';

angular.module('app.modules.auth', [])
    .config(AuthConfig.inst())
    .component(AuthIndexComponent.getName(), AuthIndexComponent);