import 'angular';

import adminConfig from './admin.config';
import adminIndexComponent from './index/admin-index.component';

angular.module('app.components.admin', [])
    .config(adminConfig)
    .component('adminIndexComponent', adminIndexComponent);