import IssuesImportsController from './issues-imports.controller';
import issuesImportsTemplate from './issues-imports.html';
import ComponentBase from "base/component.base";

export default class IssuesImportsComponent extends ComponentBase {

    static get controller() {
        return IssuesImportsController;
    }

    static get template() {
        return issuesImportsTemplate;
    }
}