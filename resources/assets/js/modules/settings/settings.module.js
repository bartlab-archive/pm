import 'angular';
import SettingsConfig from './settings.config';
import SettingsService from './services/settings.service';
import SettingsIndexComponent from './components/index/settings-index.component';

angular.module('app.modules.settings', [])
    .config(SettingsConfig.inst())
    .service(SettingsService.getName(), SettingsService)
    .component(SettingsIndexComponent.getName(), SettingsIndexComponent);