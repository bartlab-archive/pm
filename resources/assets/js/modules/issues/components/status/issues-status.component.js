import IssuesStatusController from './issues-status.controller';
import issuesStatusTemplate from './issues-status.html';
import ComponentBase from "base/component.base";

export default class IssuesStatusComponent extends ComponentBase {

    static get controller() {
        return IssuesStatusController;
    }

    static get template() {
        return issuesStatusTemplate;
    }
}