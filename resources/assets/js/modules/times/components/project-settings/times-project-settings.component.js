import TimesProjectSettingsController from './times-project-settings.controller';
import timesProjectSettingsTemplate from './times-project-settings.html';
import ComponentBase from "base/component.base";

export default class TimesProjectSettingsComponent extends ComponentBase {

    static get controller() {
        return TimesProjectSettingsController;
    }

    static get template() {
        return timesProjectSettingsTemplate;
    }

    static get bindings() {
        return {
            params: '='
        };
    }
}