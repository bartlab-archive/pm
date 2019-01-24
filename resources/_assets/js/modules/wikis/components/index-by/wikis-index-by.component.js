import WikisIndexByController from './wikis-index-by.controller';
import wikisIndexByTemplate from './wikis-index-by.html';
import ComponentBase from "base/component.base";

export default class WikisIndexByComponent extends ComponentBase {

    static get controller() {
        return WikisIndexByController;
    }

    static get template() {
        return wikisIndexByTemplate;
    }
}