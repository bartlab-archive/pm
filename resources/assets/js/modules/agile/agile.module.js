import 'angular';
import AgileConfig from './agile.config';
import AgileService from './services/agile.service';
import agileIndexComponent from './components/index/agile-index.component';
import agileProjectSettingsComponent from './components/project-settings/agile-project-settings.component';

angular.module('app.modules.agile', [])
    .config(AgileConfig.inst())
    .service('AgileService', AgileService)
    .component(agileProjectSettingsComponent.name, agileProjectSettingsComponent)
    .component(agileIndexComponent.name, agileIndexComponent);