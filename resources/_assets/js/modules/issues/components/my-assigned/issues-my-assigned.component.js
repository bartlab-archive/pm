import IssuesMyAssignedController from './issues-my-assigned.controller';
import issuesMyAssignedTemplate from './issues-my-assigned.html';
import ComponentBase from "base/component.base";

export default class IssuesMyAssignedComponent extends ComponentBase {

    static get controller() {
        return IssuesMyAssignedController;
    }

    static get template() {
        return issuesMyAssignedTemplate;
    }

    // static get bindings() {
    //     return {
    //         params: '='
    //     };
    // }
}