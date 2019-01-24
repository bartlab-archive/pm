import ProjectsSettingsController from './projects-settings.controller';
import projectsSettingsTemplate from './projects-settings.html';
import ComponentBase from "base/component.base";

export default class ProjectsSettingsComponent extends ComponentBase {

    static get controller() {
        return ProjectsSettingsController;
    }

    static get template() {
        return projectsSettingsTemplate;
    }

}