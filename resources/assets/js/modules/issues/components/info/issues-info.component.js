import IssuesInfoController from './issues-info.controller';
import issuesInfoTemplate from './issues-info.html';
import ComponentBase from "base/component.base";

export default class IssuesInfoComponent extends ComponentBase {

    static get controller() {
        return IssuesInfoController;
    }

    static get template() {
        return issuesInfoTemplate;
    }
}