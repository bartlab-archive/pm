import ProjectsSettingsInfoController from './projects-settings-info.controller';
import projectsSettingsInfoTemplate from './projects-settings-info.html';
import ComponentBase from "base/component.base";

export default class ProjectsSettingsInfoComponent extends ComponentBase {

    static get controller() {
        return ProjectsSettingsInfoController;
    }

    static get template() {
        return projectsSettingsInfoTemplate;
    }

    static get bindings() {
        return {
            params: '='
        };
    }

}