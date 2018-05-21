import WikiHistoryController from './wiki-history.controller';
import wikiHistoryTemplate from './wiki-history.html';
import ComponentBase from "base/component.base";

export default class WikiHistoryComponent extends ComponentBase {

    static get controller() {
        return WikiHistoryController;
    }

    static get template() {
        return wikiHistoryTemplate;
    }
}