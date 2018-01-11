import 'angular';
import RolesConfig from './roles.config';
import RolesService from './services/roles.service';
import rolesIndexComponent from './components/index/roles-index.component';

angular.module('app.modules.roles', [])
    .config(RolesConfig.inst())
    .service('RolesService', RolesService)
    .component(rolesIndexComponent.name, rolesIndexComponent);