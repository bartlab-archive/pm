import BoardsProjectSettingsController from './boards-project-settings.controller';
import boardsProjectSettingsTemplate from './boards-project-settings.html';
import ComponentBase from "base/component.base";

export default class BoardsProjectSettingsComponent extends ComponentBase {

    static get controller() {
        return BoardsProjectSettingsController;
    }

    static get template() {
        return boardsProjectSettingsTemplate;
    }

    static get bindings() {
        return {
            params: '='
        };
    }
}