import WikiEditController from './wiki-edit.controller';
import wikiEditTemplate from './wiki-edit.html';
import ComponentBase from "base/component.base";

export default class WikiEditComponent extends ComponentBase {

    static get controller() {
        return WikiEditController;
    }

    static get template() {
        return wikiEditTemplate;
    }
}