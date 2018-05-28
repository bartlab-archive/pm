import WikisPageController from './wikis-page.controller';
import wikisPageTemplate from './wikis-page.html';
import ComponentBase from "base/component.base";

export default class WikisPageComponent extends ComponentBase {

    static get controller() {
        return WikisPageController;
    }

    static get template() {
        return wikisPageTemplate;
    }
}