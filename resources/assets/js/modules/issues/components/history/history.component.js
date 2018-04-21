import HistoryController from './history.controller';
import historyTemplate from './history.html';
import './history.scss';
import ComponentBase from "base/component.base";

export default class HistoryComponent extends ComponentBase {

    static get controller() {
        return HistoryController;
    }

    static get template() {
        return historyTemplate;
    }

    static get bindings() {
        return {
            issueId: '=',
            trackers: '=',
            statuses: '=',
            users: '=',
            projects: '=',
            priorities: '=',
            list: '='
        };
    }
}