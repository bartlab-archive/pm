import 'angular';
import EenumerationsConfig from './enumerations.config';
import EnumerationsService from './services/enumerations.service';
import enumerationsIndexComponent from './components/index/enumerations-index.component';

angular.module('app.modules.enumerations', [])
    .config(EenumerationsConfig.inst())
    .service('EnumerationsService', EnumerationsService)
    .component(enumerationsIndexComponent.name, enumerationsIndexComponent);