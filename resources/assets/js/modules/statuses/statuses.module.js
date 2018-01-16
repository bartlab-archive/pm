import 'angular';
import StatusesConfig from './statuses.config';
import StatusesService from './services/statuses.service';
import statusesIndexComponent from './components/index/statuses-index.component';

angular.module('app.modules.statuses', [])
    .config(StatusesConfig.inst())
    .service('StatusesService', StatusesService)
    .component(statusesIndexComponent.name, statusesIndexComponent);