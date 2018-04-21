import SettingsIndexController from './settings-index.controller';
import settingsIndexTemplate from './settings-index.html';
import ComponentBase from "base/component.base";

export default class SettingsIndexComponent extends ComponentBase {

    static get controller() {
        return SettingsIndexController;
    }

    static get template() {
        return settingsIndexTemplate;
    }
}