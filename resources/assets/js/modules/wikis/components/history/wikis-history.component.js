import WikisHistoryController from './wikis-history.controller';
import wikisHistoryTemplate from './wikis-history.html';
import ComponentBase from "base/component.base";

export default class WikisHistoryComponent extends ComponentBase {

    static get controller() {
        return WikisHistoryController;
    }

    static get template() {
        return wikisHistoryTemplate;
    }
}