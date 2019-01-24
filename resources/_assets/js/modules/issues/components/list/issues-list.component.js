import IssuesListController from './issues-list.controller';
import issuesListTemplate from './issues-list.html';
import './issues-list.scss';
import ComponentBase from "base/component.base";

export default class IssuesListComponent extends ComponentBase {

    static get controller() {
        return IssuesListController;
    }

    static get template() {
        return issuesListTemplate;
    }
}