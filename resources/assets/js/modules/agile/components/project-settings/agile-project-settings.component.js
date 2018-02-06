import AgileProjectSettingsController from './agile-project-settings.controller';
import agileProjectSettingsTemplate from './agile-project-settings.html';

export default {
    name: 'agileProjectSettingsComponent',
    controller: AgileProjectSettingsController,
    template: agileProjectSettingsTemplate,
    bindings:{
        project: '='
    }
};