import 'angular';

import AuthConfig from './auth.config';
import authIndexComponent from './index/auth-index.component';

angular.module('app.components.auth', [])
    .config(AuthConfig.inst())
    .component(authIndexComponent.name, authIndexComponent);