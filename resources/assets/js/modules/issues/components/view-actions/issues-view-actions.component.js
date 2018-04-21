import IssuesViewActionsController from './issues-view-actions.controller';
import issuesViewActionsTemplate from './issues-view-actions.html';
import ComponentBase from "base/component.base";

export default class IssuesViewActionsComponent extends ComponentBase {

    static get controller() {
        return IssuesViewActionsController;
    }

    static get template() {
        return issuesViewActionsTemplate;
    }

    static get bindings() {
        return {
            selectedIssue: '<',
            openButton: '<'
        };
    }
}