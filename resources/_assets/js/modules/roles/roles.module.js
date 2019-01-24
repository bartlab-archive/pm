import 'angular';
import RolesConfig from './roles.config';
import RolesService from './services/roles.service';
import RolesIndexComponent from './components/index/roles-index.component';

angular.module('app.modules.roles', [])
    .config(RolesConfig.inst())
    .service(RolesService.getName(), RolesService)
    .component(RolesIndexComponent.getName(), RolesIndexComponent);