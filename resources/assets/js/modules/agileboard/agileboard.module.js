import 'angular';
import  AgileboardConfig from './agileboard.config';
import AgileboardService from './services/agileboard.service';
import agileboardIndexComponent from './components/index/agileboard-index.component';

angular.module('app.modules.agileboard', [])
    .config(AgileboardConfig.inst())
    .service('AgileboardService', AgileboardService)
    .component(agileboardIndexComponent.name, agileboardIndexComponent);