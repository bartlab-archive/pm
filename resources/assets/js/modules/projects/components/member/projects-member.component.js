import ProjectsMemberController from './projects-member.controller';
import projectsMemberTemplate from './projects-member.html';
import ComponentBase from "base/component.base";

export default class ProjectsMemberComponent extends ComponentBase {

    static get controller() {
        return ProjectsMemberController;
    }

    static get template() {
        return projectsMemberTemplate;
    }

}