import 'angular';
import StatusesConfig from './statuses.config';
import StatusesService from './services/statuses.service';
import StatusesIndexComponent from './components/index/statuses-index.component';

angular.module('app.modules.statuses', [])
    .config(StatusesConfig.inst())
    .service(StatusesService.getName(), StatusesService)
    .component(StatusesIndexComponent.getName(), StatusesIndexComponent);