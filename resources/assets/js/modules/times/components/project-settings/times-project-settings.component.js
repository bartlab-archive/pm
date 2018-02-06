import TimesProjectSettingsController from './times-project-settings.controller';
import timesProjectSettingsTemplate from './times-project-settings.html';

export default {
    name: 'timesProjectSettingsComponent',
    controller: TimesProjectSettingsController,
    template: timesProjectSettingsTemplate,
    bindings:{
        project: '='
    }
};