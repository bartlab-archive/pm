import 'angular';
import TimesConfig from "./times.config";
import timesListComponent from './components/list/times-list.component';
import timesProjectSettingsComponent from './components/project-settings/times-project-settings.component';

angular.module('app.modules.times', [])
    .config(TimesConfig.inst())
    .component(timesProjectSettingsComponent.name, timesProjectSettingsComponent)
    .component(timesListComponent.name, timesListComponent);