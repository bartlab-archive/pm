import 'angular';
import SettingsConfig from './settings.config';
import SettingsService from './services/settings.service';
import settingsIndexComponent from './components/index/settings-index.component';

angular.module('app.modules.settings', [])
    .config(SettingsConfig.inst())
    .service('SettingsService', SettingsService)
    .component(settingsIndexComponent.name, settingsIndexComponent);