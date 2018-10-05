import FieldsIndexController from './fields-index.controller';
import fieldsIndexTemplate from './fields-index.html';
import ComponentBase from "base/component.base";

export default class FieldsIndexComponent extends ComponentBase {

    static get controller() {
        return FieldsIndexController;
    }

    static get template() {
        return fieldsIndexTemplate;
    }
}