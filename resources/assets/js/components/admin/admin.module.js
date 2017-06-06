import 'angular';

import AdminConfig from './admin.config';
import adminIndexComponent from './index/admin-index.component';

angular.module('app.components.admin', [])
    .config(AdminConfig.inst())
    .component(adminIndexComponent.name, adminIndexComponent);