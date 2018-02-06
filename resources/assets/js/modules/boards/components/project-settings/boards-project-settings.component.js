import BoardsProjectSettingsController from './boards-project-settings.controller';
import boardsProjectSettingsTemplate from './boards-project-settings.html';

export default {
    name: 'boardsProjectSettingsComponent',
    controller: BoardsProjectSettingsController,
    template: boardsProjectSettingsTemplate,
    bindings:{
        project: '='
    }
};