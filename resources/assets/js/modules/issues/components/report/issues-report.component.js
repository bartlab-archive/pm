import IssuesReportController from './issues-report.controller';
import issuesReportTemplate from './issues-report.html';
import ComponentBase from "base/component.base";

export default class IssuesReportComponent extends ComponentBase {

    static get controller() {
        return IssuesReportController;
    }

    static get template() {
        return issuesReportTemplate;
    }
}