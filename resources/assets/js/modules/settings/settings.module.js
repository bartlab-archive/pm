import 'angular';
import SettingsConfig from './settings.config';
import settingsIndexComponent from './components/index/settings-index.component';

angular.module('app.modules.settings', [])
    .config(SettingsConfig.inst())
    .component(settingsIndexComponent.name, settingsIndexComponent);