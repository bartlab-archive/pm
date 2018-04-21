import ProjectsListController from './projects-list.controller';
import projectsListTemplate from './projects-list.html';
import './projects-list.scss';
import ComponentBase from "base/component.base";

export default class ProjectsListComponent extends ComponentBase {

    static get controller() {
        return ProjectsListController;
    }

    static get template() {
        return projectsListTemplate;
    }

}