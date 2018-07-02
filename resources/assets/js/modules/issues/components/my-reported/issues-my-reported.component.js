import IssuesMyReportedController from './issues-my-reported.controller';
import issuesMyReportedTemplate from './issues-my-reported.html';
import ComponentBase from "base/component.base";

export default class IssuesMyReportedComponent extends ComponentBase {

    static get controller() {
        return IssuesMyReportedController;
    }

    static get template() {
        return issuesMyReportedTemplate;
    }

    // static get bindings() {
    //     return {
    //         params: '='
    //     };
    // }
}