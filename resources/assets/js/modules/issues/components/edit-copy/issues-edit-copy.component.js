import IssuesEditCopyController from './issues-edit-copy.controller';
import issuesEditCopyTemplate from './issues-edit-copy.html';
import ComponentBase from "base/component.base";

export default class IssuesEditCopyComponent extends ComponentBase {

    static get controller() {
        return IssuesEditCopyController;
    }

    static get template() {
        return issuesEditCopyTemplate;
    }
}