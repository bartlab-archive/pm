import 'angular';
import AgileConfig from './agile.config';
import AgileService from './services/agile.service';
import AgileIndexComponent from './components/index/agile-index.component';
import AgileProjectSettingsComponent from './components/project-settings/agile-project-settings.component';

angular.module('app.modules.agile', [])
    .config(AgileConfig.inst())
    .service(AgileService.getName(), AgileService)
    .component(AgileProjectSettingsComponent.getName(), AgileProjectSettingsComponent)
    .component(AgileIndexComponent.getName(), AgileIndexComponent);