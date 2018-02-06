import 'angular';
import AdminConfig from './admin.config';
import adminIndexComponent from './components/index/admin-index.component';
import adminPluginsComponent from './components/plugins/admin-plugins.component';
import adminInfoComponent from './components/info/admin-info.component';

angular.module('app.modules.admin', [])
    .config(AdminConfig.inst())
    .component(adminIndexComponent.name, adminIndexComponent)
    .component(adminPluginsComponent.name, adminPluginsComponent)
    .component(adminInfoComponent.name, adminInfoComponent);