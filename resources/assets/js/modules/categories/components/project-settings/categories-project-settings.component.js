import ComponentBase from "base/component.base";
import CategoriesProjectSettingsController from './categories-project-settings.controller';
import categoriesProjectSettingsTemplate from './categories-project-settings.html';

export default class CategoriesProjectSettingsComponent extends ComponentBase {

    static get controller() {
        return CategoriesProjectSettingsController;
    }

    static get template() {
        return categoriesProjectSettingsTemplate;
    }

    static get bindings() {
        return {
            params: '='
        };
    }
}