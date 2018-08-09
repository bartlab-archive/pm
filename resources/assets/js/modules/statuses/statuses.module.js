import 'angular';
import StatusesConfig from './statuses.config';
import StatusesService from './services/statuses.service';
import StatusesListComponent from './components/list/statuses-list.component';
import StatusesFormComponent from './components/form/statuses-form.component';

angular.module('app.modules.statuses', [])
    .config(StatusesConfig.inst())
    .service(StatusesService.getName(), StatusesService)
    .component(StatusesListComponent.getName(), StatusesListComponent)
    .component(StatusesFormComponent.getName(), StatusesFormComponent);