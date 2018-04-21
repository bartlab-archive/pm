import IssuesCategoryController from './issues-category.controller';
import issuesCategoryTemplate from './issues-category.html';
import ComponentBase from "base/component.base";

export default class IssuesCategoryComponent extends ComponentBase {

    static get controller() {
        return IssuesCategoryController;
    }

    static get template() {
        return issuesCategoryTemplate;
    }
}