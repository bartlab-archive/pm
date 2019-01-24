import ProjectsNewController from './projects-new.controller';
import projectsNewTemplate from './projects-new.html';
import ComponentBase from "base/component.base";

export default class ProjectsNewComponent extends ComponentBase {

    static get controller() {
        return ProjectsNewController;
    }

    static get template() {
        return projectsNewTemplate;
    }

}