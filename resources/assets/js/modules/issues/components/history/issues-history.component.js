import ComponentBase from "base/component.base";
import IssuesHistoryController from './issues-history.controller';
import IssuesHistoryTemplate from './issues-history.html';

export default class IssuesHistoryComponent extends ComponentBase {

    static get controller() {
        return IssuesHistoryController;
    }

    static get template() {
        return IssuesHistoryTemplate;
    }

    static get bindings() {
        return {
            issue: '='
        };
    }
}