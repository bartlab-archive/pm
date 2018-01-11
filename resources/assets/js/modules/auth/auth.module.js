import 'angular';
import AuthConfig from './auth.config';
import authIndexComponent from './components/index/auth-index.component';

angular.module('app.modules.auth', [])
    .config(AuthConfig.inst())
    .component(authIndexComponent.name, authIndexComponent);