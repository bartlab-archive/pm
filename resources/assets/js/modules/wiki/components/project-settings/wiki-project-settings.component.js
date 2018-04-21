import WikiProjectSettingsController from './wiki-project-settings.controller';
import wikiProjectSettingsTemplate from './wiki-project-settings.html';
import ComponentBase from "base/component.base";

export default class WikiProjectSettingsComponent extends ComponentBase {

    static get controller() {
        return WikiProjectSettingsController;
    }

    static get template() {
        return wikiProjectSettingsTemplate;
    }

    static get bindings() {
        return {
            params: '='
        };
    }
}