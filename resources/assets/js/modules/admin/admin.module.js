import 'angular';
import AdminConfig from './admin.config';
import AdminIndexComponent from './components/index/admin-index.component';
import AdminPluginsComponent from './components/plugins/admin-plugins.component';
import AdminInfoComponent from './components/info/admin-info.component';

angular.module('app.modules.admin', [])
    .config(AdminConfig.inst())
    .component(AdminIndexComponent.getName(), AdminIndexComponent)
    .component(AdminPluginsComponent.getName(), AdminPluginsComponent)
    .component(AdminInfoComponent.getName(), AdminInfoComponent);