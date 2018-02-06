import WikiProjectSettingsController from './wiki-project-settings.controller';
import wikiProjectSettingsTemplate from './wiki-project-settings.html';

export default {
    name: 'wikiProjectSettingsComponent',
    controller: WikiProjectSettingsController,
    template: wikiProjectSettingsTemplate,
    bindings:{
        project: '='
    }
};