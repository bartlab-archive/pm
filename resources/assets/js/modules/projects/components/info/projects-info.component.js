import ProjectsInfoController from './projects-info.controller';
import projectsInfoTemplate from './projects-info.html';
import ComponentBase from "base/component.base";

export default class ProjectsInfoComponent extends ComponentBase {

    static get controller() {
        return ProjectsInfoController;
    }

    static get template() {
        return projectsInfoTemplate;
    }

}