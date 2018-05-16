import WikiFormController from './wiki-form.controller';
import wikiFormTemplate from './wiki-form.html';
import ComponentBase from "base/component.base";

export default class WikiFormComponent extends ComponentBase {

    static get controller() {
        return WikiFormController;
    }

    static get template() {
        return wikiFormTemplate;
    }
}