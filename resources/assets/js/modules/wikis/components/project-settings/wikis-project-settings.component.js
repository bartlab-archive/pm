import WikisProjectSettingsController from './wikis-project-settings.controller';
import wikisProjectSettingsTemplate from './wikis-project-settings.html';
import ComponentBase from "base/component.base";

export default class WikisProjectSettingsComponent extends ComponentBase {

    static get controller() {
        return WikisProjectSettingsController;
    }

    static get template() {
        return wikisProjectSettingsTemplate;
    }

    static get bindings() {
        return {
            params: '='
        };
    }
}