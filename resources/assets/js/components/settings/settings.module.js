import 'angular';

import SettingsConfig from './settings.config';
import settingsIndexComponent from './index/settings-index.component';

angular.module('app.components.settings', [])
    .config(SettingsConfig.inst())
    .component(settingsIndexComponent.name, settingsIndexComponent);