import 'angular';

import RolesConfig from './roles.config';
import rolesIndexComponent from './index/roles-index.component';

angular.module('app.components.roles', [])
    .config(RolesConfig.inst())
    .component(rolesIndexComponent.name, rolesIndexComponent);