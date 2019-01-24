import 'angular';
import BoardsConfig from "./boards.config";
import BoardsListComponent from './components/list/boards-list.component';
import BoardsProjectSettingsComponent from './components/project-settings/boards-project-settings.component';
import BoardsNewComponent from './components/new/boards-new.component';

angular.module('app.modules.boards', [])
    .config(BoardsConfig.inst())

    // add forum to project from project settings
    .component(BoardsNewComponent.getName(), BoardsNewComponent)
    .component(BoardsProjectSettingsComponent.getName(), BoardsProjectSettingsComponent)
    .component(BoardsListComponent.getName(), BoardsListComponent);