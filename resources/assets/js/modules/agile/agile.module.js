import 'angular';
import  AgileConfig from './agile.config';
import AgileService from './services/agile.service';
import agileIndexComponent from './components/index/agile-index.component';

angular.module('app.modules.agile', [])
    .config(AgileConfig.inst())
    .service('AgileService', AgileService)
    .component(agileIndexComponent.name, agileIndexComponent);