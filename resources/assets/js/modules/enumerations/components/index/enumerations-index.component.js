import EnumerationsIndexController from './enumerations-index.controller';
import enumerationsIndexTemplate from './enumerations-index.html';
import ComponentBase from "base/component.base";

export default class EnumerationsIndexComponent extends ComponentBase {

    static get controller() {
        return EnumerationsIndexController;
    }

    static get template() {
        return enumerationsIndexTemplate;
    }
}