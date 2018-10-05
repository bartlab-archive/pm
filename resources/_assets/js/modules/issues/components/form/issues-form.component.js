import IssuesFormController from './issues-form.controller';
import issuesFormTemplate from './issues-form.html';
import ComponentBase from "base/component.base";

export default class IssuesFormComponent extends ComponentBase {

    static get controller() {
        return IssuesFormController;
    }

    static get template() {
        return issuesFormTemplate;
    }
}