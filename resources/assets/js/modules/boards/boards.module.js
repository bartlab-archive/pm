import 'angular';
import BoardsConfig from "./boards.config";
import boardsListComponent from './components/list/boards-list.component';
import boardsProjectSettingsComponent from './components/project-settings/boards-project-settings.component';
import boardsNewComponent from './components/new/boards-new.component';

angular.module('app.modules.boards', [])
    .config(BoardsConfig.inst())

    // add forum to project from project settings
    .component(boardsNewComponent.name, boardsNewComponent)

    .component(boardsProjectSettingsComponent.name, boardsProjectSettingsComponent)
    .component(boardsListComponent.name, boardsListComponent);