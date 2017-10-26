import 'angular';

import StatusesConfig from './statuses.config';
import statusesIndexComponent from './index/statuses-index.component';

angular.module('app.components.statuses', [])
    .config(StatusesConfig.inst())
    .component(statusesIndexComponent.name, statusesIndexComponent);