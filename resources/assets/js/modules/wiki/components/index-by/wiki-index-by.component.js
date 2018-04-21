import WikiIndexByController from './wiki-index-by.controller';
import wikiIndexByTemplate from './wiki-index-by.html';
import ComponentBase from "base/component.base";

export default class WikiIndexByComponent extends ComponentBase {

    static get controller() {
        return WikiIndexByController;
    }

    static get template() {
        return wikiIndexByTemplate;
    }
}