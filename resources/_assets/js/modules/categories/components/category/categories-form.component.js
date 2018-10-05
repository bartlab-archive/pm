import ComponentBase from "base/component.base";
import CategoriesFormController from './categories-form.controller';
import categoriesFormTemplate from './categories-form.html';

export default class CategoriesFormComponent extends ComponentBase {

    static get controller() {
        return CategoriesFormController;
    }

    static get template() {
        return categoriesFormTemplate;
    }
}