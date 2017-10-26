import 'angular';

import AdminConfig from './admin.config';
import adminIndexComponent from './index/admin-index.component';
import adminProjectsComponent from './projects/admin-projects.component';
import adminPluginsComponent from './plugins/admin-plugins.component';
import adminInfoComponent from './info/admin-info.component';

angular.module('app.components.admin', [])
    .config(AdminConfig.inst())
    .component(adminIndexComponent.name, adminIndexComponent)
    .component(adminProjectsComponent.name, adminProjectsComponent)
    .component(adminPluginsComponent.name, adminPluginsComponent)
    .component(adminInfoComponent.name, adminInfoComponent);