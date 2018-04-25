import IssuesViewController from './issues-view.controller';
import issuesViewTemplate from './issues-view.html';
import './issues-view.scss';
import ComponentBase from "base/component.base";

export default class IssuesViewComponent extends ComponentBase {

    static get controller() {
        return IssuesViewController;
    }

    static get template() {
        return issuesViewTemplate;
    }

    static get bindings() {
        return {
            selectedIssue: '<',
            authorInfo: '<'
        };
    }
}