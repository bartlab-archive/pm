import 'angular';
import StatusesConfig from './statuses.config';
import statusesIndexComponent from './components/index/statuses-index.component';

angular.module('app.modules.statuses', [])
    .config(StatusesConfig.inst())
    .component(statusesIndexComponent.name, statusesIndexComponent);