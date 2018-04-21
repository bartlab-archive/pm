import VersionsProjectSettingsController from './versions-project-settings.controller';
import versionsProjectSettingsTemplate from './versions-project-settings.html';
import ComponentBase from "base/component.base";

export default class VersionsProjectSettingsComponent extends ComponentBase {

    static get controller() {
        return VersionsProjectSettingsController;
    }

    static get template() {
        return versionsProjectSettingsTemplate;
    }

    static get bindings() {
        return {
            params: '='
        };
    }
}