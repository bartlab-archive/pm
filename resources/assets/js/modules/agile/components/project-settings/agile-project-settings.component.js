import AgileProjectSettingsController from './agile-project-settings.controller';
import agileProjectSettingsTemplate from './agile-project-settings.html';
import ComponentBase from "base/component.base";

export default class AgileProjectSettingsComponent extends ComponentBase {

    static get controller() {
        return AgileProjectSettingsController;
    }

    static get template() {
        return agileProjectSettingsTemplate;
    }

    static get bindings() {
        return {
            params: '='
        };
    }

}