import WikiPageController from './wiki-page.controller';
import wikiPageTemplate from './wiki-page.html';
import ComponentBase from "base/component.base";

export default class WikiPageComponent extends ComponentBase {

    static get controller() {
        return WikiPageController;
    }

    static get template() {
        return wikiPageTemplate;
    }
}