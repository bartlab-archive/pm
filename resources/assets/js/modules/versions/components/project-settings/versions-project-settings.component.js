import VersionsProjectSettingsController from './versions-project-settings.controller';
import versionsProjectSettingsTemplate from './versions-project-settings.html';

export default {
    name: 'versionsProjectSettingsComponent',
    controller: VersionsProjectSettingsController,
    template: versionsProjectSettingsTemplate,
    bindings:{
        project: '='
    }
};