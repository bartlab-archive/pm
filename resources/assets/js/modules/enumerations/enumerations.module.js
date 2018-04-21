import 'angular';
import EenumerationsConfig from './enumerations.config';
import EnumerationsService from './services/enumerations.service';
import EnumerationsIndexComponent from './components/index/enumerations-index.component';

angular.module('app.modules.enumerations', [])
    .config(EenumerationsConfig.inst())
    .service(EnumerationsService.getName(), EnumerationsService)
    .component(EnumerationsIndexComponent.getName(), EnumerationsIndexComponent);